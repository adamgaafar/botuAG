import { Controller, Post, Body, Get } from '@nestjs/common';
import { CloudService } from './cloud.service';

@Controller('cloud')
export class CloudController {
  constructor(private cloudService: CloudService) {}

  @Post('integrate')
  async integrateCloud(
    @Body('provider') provider: string,
    @Body('credentials') credentials: any,
    @Body('regions') regions: any, // Accept 'regions' in the request body
  ) {
    return this.cloudService.integrateCloud(provider, credentials, regions);
  }

  @Get('providers')
  async getProviders() {
    return this.cloudService.getCloudProviders();
  }
}
