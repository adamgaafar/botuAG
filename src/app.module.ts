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
import { AIService } from './ai/ai.service';
import { CICDController } from './cicd/cicd.controller';
import { CICDService } from './cicd/cicd.service';
import { AIController } from './ai/ai.controller';
import { CloudController } from './cloud/cloud.controller';
import { CloudService } from './cloud/cloud.service';
import { MonitoringService } from './monitoring/monitoring.service';
import { NotificationsService } from './notifications/notifications.service';
import { ResourceService } from './resource/resource.service';
import { DeploymentGateway } from './deployment/deployment.gateway';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UserModule, PrismaModule],
  controllers: [
    AppController,
    TaskController,
    JobController,
    CloudRegionController,
    CloudCredentialController,
    MetricController,
    CICDController, // Add CICDController
    AIController,   // Add AIController
    CloudController, // Add CloudController
  ],
  providers: [
    AppService,
    TaskService,
    JobService,
    CloudRegionService,
    CloudCredentialService,
    MetricService,
    CICDService, // Add CICDService
    AIService,   // Add AIService
    CloudService, // Add CloudService
    MonitoringService, // Add MonitoringService
    NotificationsService, // Add NotificationsService
    ResourceService, // Add ResourceService
    DeploymentGateway, // Add DeploymentGateway
  ],
})
export class AppModule {}
