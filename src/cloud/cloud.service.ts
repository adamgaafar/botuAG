import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper';
import { simpleGit } from 'simple-git';

@Injectable()
export class CloudService {
  constructor(private prisma: PrismaService) {}

  async deploy(file: Express.Multer.File, repoLink: string, cloudProvider: string) {
    if (!file && !repoLink) {
      throw new HttpException('Either a file or repo link must be provided', HttpStatus.BAD_REQUEST);
    }

    // Simulate deployment logic
    const deployment = await this.prisma.deployment.create({
      data: {
        projectId: 'example-project-id',
        version: '1.0.0',
        status: 'in_progress',
      },
    });

    // Simulate async deployment completion
    setTimeout(async () => {
      await this.prisma.deployment.update({
        where: { id: deployment.id },
        data: { status: 'success' },
      });
    }, 5000);

    return { message: 'Deployment initiated', deploymentId: deployment.id };
  }

  async getDeployments() {
    return this.prisma.deployment.findMany();
  }

  async integrateCloud(provider: string, credentials: any, regions: any): Promise<any> {
    return this.prisma.cloudIntegration.create({
      data: {
        provider,
        credentials,
        regions,
      },
    });
  }

  async getCloudProviders(): Promise<any[]> {
    return this.prisma.cloudIntegration.findMany();
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
