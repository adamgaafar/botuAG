import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(workflowId: string, name: string) {
    return this.prisma.task.create({
      data: {
        workflowId,
        name,
      },
    });
  }

  async getTasksByWorkflow(workflowId: string) {
    return this.prisma.task.findMany({
      where: { workflowId },
    });
  }

  async updateTask(id: string, data: { name?: string; status?: string }) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
