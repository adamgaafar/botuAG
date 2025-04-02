import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService, PrismaService], // Include dependencies
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('AuthService Integration', () => {
  it('should sign up and log in a user', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const role = 'user';

    const signupResult = await service.signUp(email, password, role);
    expect(signupResult).toHaveProperty('access_token');

    const loginResult = await service.login({ email, password });
    expect(loginResult).toHaveProperty('access_token');
  });
});
