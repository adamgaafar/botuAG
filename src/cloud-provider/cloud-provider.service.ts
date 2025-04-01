import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CloudProviderService {
  constructor(private prisma: PrismaService) {}

  async createCloudProvider(name: string, credentials: object) {
    return this.prisma.cloudProvider.create({
      data: {
        name,
        credentials,
      },
    });
  }

  async getAllCloudProviders() {
    return this.prisma.cloudProvider.findMany();
  }

  async getCloudProviderById(id: string) {
    return this.prisma.cloudProvider.findUnique({
      where: { id },
    });
  }

  async updateCloudProvider(id: string, data: { name?: string; credentials?: object }) {
    return this.prisma.cloudProvider.update({
      where: { id },
      data,
    });
  }

  async deleteCloudProvider(id: string) {
    return this.prisma.cloudProvider.delete({
      where: { id },
    });
  }
}
