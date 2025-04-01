import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CloudService {
  constructor(private prisma: PrismaService) {}

  async integrateCloud(provider: string, credentials: any, regions: any) {
    // Ensure the 'regions' field is included in the data object
    return this.prisma.cloudIntegration.create({
      data: {
        provider,
        credentials,
        regions, // Add the 'regions' field
      },
    });
  }

  async getCloudProviders() {
    return this.prisma.cloudIntegration.findMany();
  }
}
