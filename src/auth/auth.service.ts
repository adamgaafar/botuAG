// src/auth/auth.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Sign up method to create a new user
  async signUp(email: string, password: string, role: string) {
    // Check if the user already exists
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Create the new user
    const newUser = await this.userService.createUser(email, password, role);

    // Generate JWT token after user creation
    const payload = { email: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // Login method to authenticate user and return JWT token
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    // Find user by email
    const user = await this.userService.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
