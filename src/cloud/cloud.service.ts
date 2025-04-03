import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper';
import { simpleGit } from 'simple-git';
import * as child_process from 'child_process';

@Injectable()
export class CloudService {
  constructor(private prisma: PrismaService) {}

  async integrateCloud(provider: string, credentials: any, regions: any): Promise<any> {
    return this.prisma.cloudIntegration.create({
      data: { provider, credentials, regions },
    });
  }

  async getCloudProviders(): Promise<any> {
    return this.prisma.cloudIntegration.findMany();
  }

  // Deployment handler
  async deploy(
    file: Express.Multer.File,
    repoLink: string,
    cloudProvider: string,
  ): Promise<any> {
    if (!file && !repoLink) {
      throw new HttpException(
        'Either a ZIP file or repository link must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isStatic = await this.isStaticWebsite(repoLink);
    if (isStatic) {
      if (cloudProvider === 'aws' || cloudProvider === 'all') {
        return this.deployStaticToS3(repoLink);
      }
    } else {
      if (cloudProvider === 'aws' || cloudProvider === 'all') {
        return this.deployToAWS(repoLink);
      }
    }

    throw new HttpException('Unsupported deployment type or cloud provider', HttpStatus.BAD_REQUEST);
  }

  private async isStaticWebsite(repoLink: string): Promise<boolean> {
    const clonePath = path.join(__dirname, '../../clonedRepo', path.basename(repoLink));
    // Remove the directory if it already exists
    if (fs.existsSync(clonePath)) {
      fs.rmdirSync(clonePath, { recursive: true });
    }

    const git = simpleGit();
    await git.clone(repoLink, clonePath);

    console.log('Cloning to:', clonePath);


    // Check if it's a static website (contains index.html but no Dockerfile)
    const hasIndexHtml = fs.existsSync(path.join(clonePath, 'index.html'));
    const hasDockerfile = fs.existsSync(path.join(clonePath, 'Dockerfile'));

    return hasIndexHtml && !hasDockerfile;
  }

  // Deploy static website to S3
  private async deployStaticToS3(repoLink: string): Promise<any> {
    const s3 = new AWS.S3();
    const bucketName = `static-site-${Date.now()}`;
    
    // Create S3 bucket
    await s3.createBucket({ Bucket: bucketName }).promise();
    
    // Set bucket policy to allow public read
    await s3.putBucketPolicy({
      Bucket: bucketName,
      Policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{ Effect: 'Allow', Principal: '*', Action: 's3:GetObject', Resource: `arn:aws:s3:::${bucketName}/*` }],
      }),
    }).promise();

    // Set the bucket as a static website
    const websiteConfig = {
      Bucket: bucketName,
      WebsiteConfiguration: { IndexDocument: { Suffix: 'index.html' }, ErrorDocument: { Key: 'error.html' } },
    };
    await s3.putBucketWebsite(websiteConfig).promise();

    // Upload files to S3
    const clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoLink));
    const files = fs.readdirSync(clonePath);
    for (const file of files) {
      const filePath = path.join(clonePath, file);
      const fileContent = fs.readFileSync(filePath);
      await s3.upload({ Bucket: bucketName, Key: file, Body: fileContent }).promise();
    }

    return { message: 'Static website deployed successfully', url: `http://${bucketName}.s3-website-${process.env.AWS_REGION}.amazonaws.com` };
  }

  // Deploy complete project (with Docker)
  private async deployToAWS(repoLink: string): Promise<any> {
    const clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoLink));
    
    // Check if a Dockerfile or docker-compose.yml exists for Docker-based deployment
    const dockerFilePath = path.join(clonePath, 'Dockerfile');
    const dockerComposePath = path.join(clonePath, 'docker-compose.yml');

    if (fs.existsSync(dockerFilePath) || fs.existsSync(dockerComposePath)) {
      // For ECS or VPS deployment using Docker Compose
      if (fs.existsSync(dockerComposePath)) {
        child_process.execSync(`docker-compose -f ${dockerComposePath} up -d`, { cwd: clonePath });
        return { message: 'Project deployed using Docker Compose' };
      }

      // Additional logic can be added here for ECS deployment
      return { message: 'ECS deployment logic to be implemented' };
    }

    throw new HttpException('No Dockerfile or docker-compose.yml found', HttpStatus.BAD_REQUEST);
  }

  // Deploy from ZIP file
  async deployFromZip(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const uploadPath = path.join(__dirname, '../../uploads', file.filename);
    const extractPath = path.join(__dirname, '../../extracted', file.filename);

    fs.writeFileSync(uploadPath, file.buffer);

    await fs
      .createReadStream(uploadPath)
      .pipe(unzipper.Extract({ path: extractPath }))
      .promise();

    fs.unlinkSync(uploadPath);

    console.log(`Deploying files from ${extractPath}`);
    return { message: 'Deployment from ZIP initiated successfully' };
  }

  // Deploy from GitHub repository
  async deployFromGitHub(repoUrl: string): Promise<any> {
    if (!repoUrl) {
      throw new HttpException('Repository URL is required', HttpStatus.BAD_REQUEST);
    }

    const clonePath = path.join(__dirname, '../../cloned-repos', path.basename(repoUrl));

    const git = simpleGit();
    await git.clone(repoUrl, clonePath);

    console.log(`Deploying files from ${clonePath}`);
    return { message: 'Deployment from GitHub repository initiated successfully' };
  }
}
