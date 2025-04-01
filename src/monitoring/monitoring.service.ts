import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MonitoringService {
  constructor(private prisma: PrismaService) {}

  async createMonitoring(resourceId: string, metrics: object) {
    return this.prisma.monitoring.create({
      data: {
        resourceId,
        metrics,
      },
    });
  }

  async getAllMonitorings() {
    return this.prisma.monitoring.findMany();
  }

  async getMonitoringById(id: string) {
    return this.prisma.monitoring.findUnique({
      where: { id },
    });
  }

  async updateMonitoring(id: string, data: { metrics?: object }) {
    return this.prisma.monitoring.update({
      where: { id },
      data,
    });
  }

  async deleteMonitoring(id: string) {
    return this.prisma.monitoring.delete({
      where: { id },
    });
  }
}
