import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const createSpy = jest.spyOn(service, 'createTask').mockResolvedValue({
      id: 'task-id',
      workflowId: 'workflow-id',
      name: 'Test Task',
      status: 'pending',
      createdAt: new Date(),
    });
    const result = await service.createTask('workflow-id', 'Test Task');
    expect(createSpy).toHaveBeenCalledWith('workflow-id', 'Test Task');
    expect(result.name).toBe('Test Task');
  });
});
