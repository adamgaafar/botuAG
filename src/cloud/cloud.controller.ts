import { Controller, Post, Body, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudService } from './cloud.service';
import { Multer } from 'multer'; // Import Multer types

@Controller('cloud')
export class CloudController {
  constructor(private readonly cloudService: CloudService) {}

  @Post('integrate')
  async integrateCloud(
    @Body('provider') provider: string,
    @Body('credentials') credentials: any,
    @Body('regions') regions: any, 
  ) {
    // Create a cloud integration record
    return this.cloudService.integrateCloud(provider, credentials, regions);
  }

  @Get('providers')
  async getProviders() {
    // Retrieve all cloud providers
    return this.cloudService.getCloudProviders();
  }

  @Post('deploy')
  @UseInterceptors(FileInterceptor('file'))
  async deploy(
    @UploadedFile() file: Express.Multer.File,
    @Body('repoLink') repoLink: string,
    @Body('cloudProvider') cloudProvider: string,
  ) {
    return this.cloudService.deploy(file, repoLink, cloudProvider); // Removed 'requirements'
  }
  

  @Post('deploy/upload')
  @UseInterceptors(FileInterceptor('file'))
  async deployFromZip(@UploadedFile() file: Express.Multer.File) {
    // Handle ZIP file deployment
    return this.cloudService.deployFromZip(file);
  }

  @Post('deploy/github')
  async deployFromGitHub(@Body('repoUrl') repoUrl: string) {
    // Handle GitHub repository deployment
    return this.cloudService.deployFromGitHub(repoUrl);
  }
}
