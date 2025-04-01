import { Controller, Post, Body } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('optimize')
  async optimizeWorkflow(@Body() parameters: any) {
    return this.aiService.optimizeWorkflow(parameters);
  }
}
