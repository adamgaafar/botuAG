import { Controller, Post, Get, Param, Body, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { TaskService } from './task.service';

@ApiTags('Tasks') // Add Swagger tag
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ schema: { example: { workflowId: 'workflow-id', name: 'Task Name' } } })
  @Post()
  async createTask(@Body('workflowId') workflowId: string, @Body('name') name: string) {
    return this.taskService.createTask(workflowId, name);
  }

  @ApiOperation({ summary: 'Get tasks by workflow ID' })
  @ApiParam({ name: 'workflowId', description: 'Workflow ID' })
  @Get(':workflowId')
  async getTasksByWorkflow(@Param('workflowId') workflowId: string) {
    return this.taskService.getTasksByWorkflow(workflowId);
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ schema: { example: { name: 'Updated Task Name', status: 'completed' } } })
  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() data: { name?: string; status?: string }) {
    return this.taskService.updateTask(id, data);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
