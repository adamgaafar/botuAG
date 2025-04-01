import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

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

  async fetchPrometheusMetrics(query: string): Promise<any> {
    const prometheusUrl = process.env.PROMETHEUS_URL;
    if (!prometheusUrl) {
      throw new HttpException('Prometheus URL is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = await axios.get(`${prometheusUrl}/api/v1/query`, {
      params: { query },
    });
    return response.data;
  }

  async fetchGrafanaDashboard(dashboardId: string): Promise<any> {
    const grafanaUrl = process.env.GRAFANA_URL;
    if (!grafanaUrl) {
      throw new HttpException('Grafana URL is missing', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const response = await axios.get(`${grafanaUrl}/api/dashboards/${dashboardId}`);
    return response.data;
  }

  async detectAnomalies(metrics: object): Promise<any> {
    // Logic for anomaly detection
    return { anomalies: [], message: 'No anomalies detected' };
  }

  async autoRemediate(issueId: string): Promise<any> {
    // Logic for auto-remediation
    return { success: true, message: 'Issue remediated successfully' };
  }
}
