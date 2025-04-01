import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post()
  async createJob(@Body('taskId') taskId: string, @Body('type') type: string) {
    return this.jobService.createJob(taskId, type);
  }

  @Get(':taskId')
  async getJobsByTask(@Param('taskId') taskId: string) {
    return this.jobService.getJobsByTask(taskId);
  }

  @Patch(':id')
  async updateJob(@Param('id') id: string, @Body() data: { status?: string; result?: object }) {
    return this.jobService.updateJob(id, data);
  }

  @Delete(':id')
  async deleteJob(@Param('id') id: string) {
    return this.jobService.deleteJob(id);
  }
}
