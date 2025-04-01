import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CICDService } from './cicd.service';

@Controller('cicd')
export class CICDController {
  constructor(private cicdService: CICDService) {}

  @Post()
  async createPipeline(
    @Body('projectId') projectId: string,
    @Body('name') name: string,
    @Body('config') config?: string,
  ) {
    return this.cicdService.createPipeline(projectId, name, config);
  }

  @Get(':projectId')
  async getPipelines(@Param('projectId') projectId: string) {
    return this.cicdService.getPipelinesByProject(projectId);
  }
}
