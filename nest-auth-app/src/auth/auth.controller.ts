// src/auth/auth.controller.ts

import { Controller, Post, Request, UseGuards } from '@nestjs/common'; // Ensure UseGuards and Body are imported
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local')) // Don't forget this guard, it's crucial!
  async login(@Request() req: any) {
    // Add type for req, and AuthDto for clarity
    // console.log(req.user); // <--- REMOVE THIS LINE!
    return this.authService.login(req.user);
  }
}
