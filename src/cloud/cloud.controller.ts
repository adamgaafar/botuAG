import { Controller, Post, Body, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudService } from './cloud.service';
import { Multer } from 'multer'; // Import Multer types

@Controller('cloud')
export class CloudController {
  constructor(private cloudService: CloudService) {}

  @Post('integrate')
  async integrateCloud(
    @Body('provider') provider: string,
    @Body('credentials') credentials: any,
    @Body('regions') regions: any, // Accept 'regions' in the request body
  ) {
    return this.cloudService.integrateCloud(provider, credentials, regions); // Pass 'regions' to the service
  }

  @Get('providers')
  async getProviders() {
    return this.cloudService.getCloudProviders();
  }

  @Post('deploy')
  @UseInterceptors(FileInterceptor('file'))
  async deploy(
    @UploadedFile() file: Express.Multer.File, // Use Express.Multer.File type
    @Body('repoLink') repoLink: string,
    @Body('cloudProvider') cloudProvider: string,
    @Body('requirements') requirements: string,
  ) {
    return this.cloudService.deploy(file, repoLink, cloudProvider, requirements);
  }

  @Post('deploy/upload')
  @UseInterceptors(FileInterceptor('file'))
  async deployFromZip(@UploadedFile() file: Express.Multer.File) {
    return this.cloudService.deployFromZip(file);
  }

  @Post('deploy/github')
  async deployFromGitHub(@Body('repoUrl') repoUrl: string) {
    return this.cloudService.deployFromGitHub(repoUrl);
  }
}
