import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeploymentService {
  constructor(private prisma: PrismaService) {}

  async createDeployment(projectId: string, version: string) {
    return this.prisma.deployment.create({
      data: {
        projectId,
        version,
      },
    });
  }

  async getAllDeployments() {
    return this.prisma.deployment.findMany();
  }

  async getDeploymentById(id: string) {
    return this.prisma.deployment.findUnique({
      where: { id },
    });
  }

  async updateDeployment(id: string, data: { version?: string; status?: string }) {
    return this.prisma.deployment.update({
      where: { id },
      data,
    });
  }

  async deleteDeployment(id: string) {
    return this.prisma.deployment.delete({
      where: { id },
    });
  }
}
