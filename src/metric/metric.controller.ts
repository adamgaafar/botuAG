import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { MetricService } from './metric.service';

@Controller('metrics')
export class MetricController {
  constructor(private metricService: MetricService) {}

  @Post()
  async createMetric(
    @Body('monitoringId') monitoringId: string,
    @Body('name') name: string,
    @Body('value') value: number,
  ) {
    return this.metricService.createMetric(monitoringId, name, value);
  }

  @Get(':monitoringId')
  async getMetricsByMonitoring(@Param('monitoringId') monitoringId: string) {
    return this.metricService.getMetricsByMonitoring(monitoringId);
  }

  @Delete(':id')
  async deleteMetric(@Param('id') id: string) {
    return this.metricService.deleteMetric(id);
  }
}
