import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as AWS from 'aws-sdk';
import { google } from 'googleapis';
import { DefaultAzureCredential } from '@azure/identity';
import { ComputeManagementClient } from '@azure/arm-compute';
import * as fs from 'fs';
import * as path from 'path';
import { Multer } from 'multer'; // Import Multer types

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
      accessKeyId: accessKeyId ?? '', // Provide a fallback or ensure it's a string
      secretAccessKey: secretAccessKey ?? '',
      region: region ?? '',
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
    file: Express.Multer.File, // Use Express.Multer.File type
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

    const deploymentTasks: Promise<void>[] = []; // Ensure correct typing
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
  }

  private async deployToAWS(file: Express.Multer.File, repoLink: string, requirements: string): Promise<void> {
    // AWS deployment logic
    console.log('Deploying to AWS with:', { file, repoLink, requirements });
  }

  private async deployToAzure(file: Express.Multer.File, repoLink: string, requirements: string): Promise<void> {
    // Azure deployment logic
    console.log('Deploying to Azure with:', { file, repoLink, requirements });
  }

  private async deployToGCP(file: Express.Multer.File, repoLink: string, requirements: string): Promise<void> {
    // GCP deployment logic
    console.log('Deploying to GCP with:', { file, repoLink, requirements });
  }
}
