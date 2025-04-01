import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MetricService {
  constructor(private prisma: PrismaService) {}

  async createMetric(monitoringId: string, name: string, value: number) {
    return this.prisma.metric.create({
      data: {
        monitoringId,
        name,
        value,
      },
    });
  }

  async getMetricsByMonitoring(monitoringId: string) {
    return this.prisma.metric.findMany({
      where: { monitoringId },
    });
  }

  async deleteMetric(id: string) {
    return this.prisma.metric.delete({
      where: { id },
    });
  }
}
