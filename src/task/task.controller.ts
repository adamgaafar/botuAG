import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body('workflowId') workflowId: string, @Body('name') name: string) {
    return this.taskService.createTask(workflowId, name);
  }

  @Get(':workflowId')
  async getTasksByWorkflow(@Param('workflowId') workflowId: string) {
    return this.taskService.getTasksByWorkflow(workflowId);
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: { name?: string; status?: string }) {
    return this.taskService.updateTask(id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
