import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CICDService {
  constructor(private prisma: PrismaService) {}

  async createPipeline(projectId: string, name: string) {
    return this.prisma.cICDPipeline.create({
      data: {
        projectId,
        name,
      },
    });
  }

  async getPipelinesByProject(projectId: string) {
    return this.prisma.cICDPipeline.findMany({
      where: { projectId },
    });
  }

  async updatePipeline(id: string, status: string) {
    return this.prisma.cICDPipeline.update({
      where: { id },
      data: { status },
    });
  }
}
