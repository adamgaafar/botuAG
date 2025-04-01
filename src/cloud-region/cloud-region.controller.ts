import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { CloudRegionService } from './cloud-region.service';

@Controller('cloud-regions')
export class CloudRegionController {
  constructor(private cloudRegionService: CloudRegionService) {}

  @Post()
  async createRegion(@Body('providerId') providerId: string, @Body('name') name: string) {
    return this.cloudRegionService.createRegion(providerId, name);
  }

  @Get(':providerId')
  async getRegionsByProvider(@Param('providerId') providerId: string) {
    return this.cloudRegionService.getRegionsByProvider(providerId);
  }

  @Delete(':id')
  async deleteRegion(@Param('id') id: string) {
    return this.cloudRegionService.deleteRegion(id);
  }
}
