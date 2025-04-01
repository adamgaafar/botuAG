import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { CloudCredentialService } from './cloud-credential.service';

@Controller('cloud-credentials')
export class CloudCredentialController {
  constructor(private cloudCredentialService: CloudCredentialService) {}

  @Post()
  async createCredential(
    @Body('providerId') providerId: string,
    @Body('key') key: string,
    @Body('secret') secret: string,
  ) {
    return this.cloudCredentialService.createCredential(providerId, key, secret);
  }

  @Get(':providerId')
  async getCredentialsByProvider(@Param('providerId') providerId: string) {
    return this.cloudCredentialService.getCredentialsByProvider(providerId);
  }

  @Delete(':id')
  async deleteCredential(@Param('id') id: string) {
    return this.cloudCredentialService.deleteCredential(id);
  }
}
