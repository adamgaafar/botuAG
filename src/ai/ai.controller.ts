import { Controller, Post, Body } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('optimize')
  async optimizeWorkflow(@Body() parameters: any) {
    return this.aiService.optimizeWorkflow(parameters);
  }

  @Post('generate-iac')
  async generateIaCTemplate(@Body('requirements') requirements: string) {
    return { template: await this.aiService.generateIaCTemplate(requirements) };
  }

  @Post('generate-pipeline')
  async generatePipelineConfig(@Body('repositoryUrl') repositoryUrl: string) {
    return { config: await this.aiService.generatePipelineConfig(repositoryUrl) };
  }
}
