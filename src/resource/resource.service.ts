import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async createResource(cloudProviderId: string, type: string, configuration: object) {
    return this.prisma.resource.create({
      data: {
        cloudProviderId,
        type,
        configuration,
      },
    });
  }

  async getAllResources() {
    return this.prisma.resource.findMany();
  }

  async getResourceById(id: string) {
    return this.prisma.resource.findUnique({
      where: { id },
    });
  }

  async updateResource(id: string, data: { type?: string; configuration?: object; status?: string }) {
    return this.prisma.resource.update({
      where: { id },
      data,
    });
  }

  async deleteResource(id: string) {
    return this.prisma.resource.delete({
      where: { id },
    });
  }
}
