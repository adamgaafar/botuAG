import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CloudRegionService {
  constructor(private prisma: PrismaService) {}

  async createRegion(providerId: string, name: string) {
    return this.prisma.cloudRegion.create({
      data: {
        providerId,
        name,
      },
    });
  }

  async getRegionsByProvider(providerId: string) {
    return this.prisma.cloudRegion.findMany({
      where: { providerId },
    });
  }

  async deleteRegion(id: string) {
    return this.prisma.cloudRegion.delete({
      where: { id },
    });
  }
}
