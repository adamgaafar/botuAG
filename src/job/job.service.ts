import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async createJob(taskId: string, type: string) {
    return this.prisma.job.create({
      data: {
        taskId,
        type,
      },
    });
  }

  async getJobsByTask(taskId: string) {
    return this.prisma.job.findMany({
      where: { taskId },
    });
  }

  async updateJob(id: string, data: { status?: string; result?: object }) {
    return this.prisma.job.update({
      where: { id },
      data,
    });
  }

  async deleteJob(id: string) {
    return this.prisma.job.delete({
      where: { id },
    });
  }
}
