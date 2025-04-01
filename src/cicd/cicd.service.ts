import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CICDService {
  constructor(private prisma: PrismaService) {}

  async createPipeline(projectId: string, name: string, config?: string): Promise<any> {
    return this.prisma.cICDPipeline.create({
      data: {
        projectId,
        name,
        ...(config && { config }), // Include 'config' only if it is defined
      },
    });
  }

  async getPipelinesByProject(projectId: string): Promise<any[]> {
    return this.prisma.cICDPipeline.findMany({
      where: { projectId },
    });
  }
}
