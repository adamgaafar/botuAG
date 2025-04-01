import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

   // Find user by email
   async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

   // Add the findById method here
   async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  

}
