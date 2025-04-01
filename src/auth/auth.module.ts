// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Add AuthController
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret',  // Ensure you have JWT_SECRET in .env or use the fallback secret
      signOptions: { expiresIn: '60m' },  // Set token expiration time
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtAuthStrategy],
  controllers: [AuthController], // Add AuthController here
  exports: [AuthService],
})
export class AuthModule {}
