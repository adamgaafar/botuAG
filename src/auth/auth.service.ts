import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Sign up method to create a new user
  async signUp(email: string, password: string, role: string) {
    email = sanitizeHtml(email);
    role = sanitizeHtml(role);
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser(email, hashedPassword, role);
    const payload = { email: newUser.email, sub: newUser.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  // Login method with improved error handling
  async login(loginDto: LoginDto) {
    loginDto.email = sanitizeHtml(loginDto.email);
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('User not found. Please sign up.', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Incorrect password. Please try again.', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token, message: 'Login successful' };
  }
}
