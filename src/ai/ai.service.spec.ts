import { Test, TestingModule } from '@nestjs/testing';
import { AIService } from './ai.service';

describe('AIService', () => {
  let service: AIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AIService],
    }).compile();

    service = module.get<AIService>(AIService);
  });

  it('should generate IaC template', async () => {
    const result = await service.generateIaCTemplate('requirements');
    expect(result).toContain('resource');
  });

  it('should generate pipeline config', async () => {
    const result = await service.generatePipelineConfig('repository details');
    expect(result).toContain('pipeline');
  });
});
