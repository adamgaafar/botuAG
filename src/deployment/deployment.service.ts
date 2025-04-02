import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeploymentGateway } from './deployment.gateway';

@Injectable()
export class DeploymentService {
  constructor(
    private prisma: PrismaService,
    private deploymentGateway: DeploymentGateway,
  ) {}

  async createDeployment(projectId: string, version: string) {
    const deployment = await this.prisma.deployment.create({
      data: { projectId, version },
    });
    this.deploymentGateway.sendDeploymentUpdate({
      id: deployment.id,
      status: 'in_progress',
    });
    return deployment;
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

  async updateDeploymentStatus(id: string, status: string) {
    const deployment = await this.prisma.deployment.update({
      where: { id },
      data: { status },
    });
    this.deploymentGateway.sendDeploymentUpdate(deployment);
    return deployment;
  }
}
