import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    return { message: 'eshta8al World!' }; // Ensure this matches the expected response
  }
  private prisma = new PrismaClient();

  @Get('test-db')
  async testDB() {
    return this.prisma.user.findMany(); // Fetch all users
  }

  @Get('health')
  healthCheck(): any {
    return { status: 'UP' }; // Add health check endpoint
  }
}
