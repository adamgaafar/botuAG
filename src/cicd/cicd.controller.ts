import { Controller, Post, Body, Get, Param } from '@nestjs/common';

@Controller('cicd')
export class CICDController {
  @Post()
  async createPipeline(@Body() data: { projectId: string; name: string }) {
    // Mock pipeline creation
    return { message: 'Pipeline created', data };
  }

  @Get(':projectId')
  async getPipelines(@Param('projectId') projectId: string) {
    // Mock fetching pipelines
    return [{ id: 'pipeline1', projectId, name: 'Build Pipeline', status: 'running' }];
  }
}
