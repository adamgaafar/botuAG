import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as AWS from 'aws-sdk';
import { google } from 'googleapis';
import { DefaultAzureCredential } from '@azure/identity';
import { ComputeManagementClient } from '@azure/arm-compute';
import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper';
import { simpleGit } from 'simple-git';

@Injectable()
export class CloudService {
  constructor(private prisma: PrismaService) {}

  async integrateCloud(provider: string, credentials: any, regions: any): Promise<any> {
    return this.prisma.cloudIntegration.create({
      data: {
        provider,
        credentials,
        regions,
      },
    });
  }

  async provisionAWSResource(resourceConfig: any): Promise<any> {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION;

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new HttpException('AWS credentials are missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const ec2 = new AWS.EC2({
      accessKeyId,
      secretAccessKey,
      region,
    });

    return ec2.runInstances(resourceConfig).promise();
  }

  async provisionGCPResource(resourceConfig: any): Promise<any> {
    const credentials = process.env.GCP_CREDENTIALS;
    if (!credentials) {
      throw new HttpException('GCP credentials are missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    const compute = google.compute({ version: 'v1', auth });
    return compute.instances.insert(resourceConfig);
  }

  async provisionAzureResource(resourceConfig: any): Promise<any> {
    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
    if (!subscriptionId) {
      throw new HttpException('Azure subscription ID is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const credential = new DefaultAzureCredential();
    const client = new ComputeManagementClient(credential, subscriptionId);
    return client.virtualMachines.beginCreateOrUpdate(
      resourceConfig.resourceGroupName,
      resourceConfig.vmName,
      resourceConfig.parameters,
    );
  }

  async getCloudProviders(): Promise<any[]> {
    return this.prisma.cloudIntegration.findMany();
  }

  async deploy(
    file: Express.Multer.File,
    repoLink: string,
    cloudProvider: string,
    requirements: string,
  ): Promise<any> {
    if (!file && !repoLink) {
      throw new HttpException(
        'Either a ZIP file or repository link must be provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const deploymentTasks: Promise<void>[] = [];
    try {
      if (cloudProvider === 'aws' || cloudProvider === 'all') {
        deploymentTasks.push(this.deployToAWS(file, repoLink, requirements));
      }
      if (cloudProvider === 'azure' || cloudProvider === 'all') {
        deploymentTasks.push(this.deployToAzure(file, repoLink, requirements));
      }
      if (cloudProvider === 'gcp' || cloudProvider === 'all') {
        deploymentTasks.push(this.deployToGCP(file, repoLink, requirements));
      }

      await Promise.all(deploymentTasks);
      return { message: 'Deployment initiated successfully' };
    } catch (error) {
      console.error('Deployment error:', error.message);
      throw new HttpException('Deployment failed. Please check the logs.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async deployToAWS(file: Express.Multer.File, repoLink: string, requirements: string): Promise<void> {
    console.log('Deploying to AWS with:', { file, repoLink, requirements });
  }

  private async deployToAzure(file: Express.Multer.File, repoLink: string, requirements: string): Promise<void> {
    console.log('Deploying to Azure with:', { file, repoLink, requirements });
  }

  private async deployToGCP(file: Express.Multer.File, repoLink: string, requirements: string): Promise<void> {
    console.log('Deploying to GCP with:', { file, repoLink, requirements });
  }

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
