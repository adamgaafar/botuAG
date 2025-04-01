import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller'; // Import the UserController

@Module({
  controllers: [UserController], // Add the controller here
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
