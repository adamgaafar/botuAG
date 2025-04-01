import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TaskService } from './task/task.service';
import { JobService } from './job/job.service';
import { CloudRegionService } from './cloud-region/cloud-region.service';
import { CloudCredentialService } from './cloud-credential/cloud-credential.service';
import { MetricService } from './metric/metric.service';
import { TaskController } from './task/task.controller';
import { JobController } from './job/job.controller';
import { CloudRegionController } from './cloud-region/cloud-region.controller';
import { CloudCredentialController } from './cloud-credential/cloud-credential.controller';
import { MetricController } from './metric/metric.controller';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UserModule, PrismaModule],
  controllers: [
    AppController,
    TaskController,
    JobController,
    CloudRegionController,
    CloudCredentialController,
    MetricController,
  ],
  providers: [
    AppService,
    TaskService,
    JobService,
    CloudRegionService,
    CloudCredentialService,
    MetricService,
  ],
})
export class AppModule {}
