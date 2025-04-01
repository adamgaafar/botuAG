import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CloudCredentialService {
  constructor(private prisma: PrismaService) {}

  async createCredential(providerId: string, key: string, secret: string) {
    return this.prisma.cloudCredential.create({
      data: {
        providerId,
        key,
        secret,
      },
    });
  }

  async getCredentialsByProvider(providerId: string) {
    return this.prisma.cloudCredential.findMany({
      where: { providerId },
    });
  }

  async deleteCredential(id: string) {
    return this.prisma.cloudCredential.delete({
      where: { id },
    });
  }
}
