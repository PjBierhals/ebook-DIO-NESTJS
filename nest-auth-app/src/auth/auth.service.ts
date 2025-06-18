// src/auth/auth.service.ts

import { AuthDto } from './dto/auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Importe UnauthorizedException
import { JwtService } from '@nestjs/jwt';
import { Permission, Role, User } from 'generated/prisma';
import { UsersService } from 'src/users/users.service';
import { HashingService } from './hashing/hashing.service';

interface AuthenticatedUser extends User {
  role: Role & { permissions: Permission[] };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly Crypt: HashingService,
  ) {}

  async validateUser(authDto: AuthDto): Promise<AuthenticatedUser | null> {
    const existUser = await this.userService.findEmail(authDto.email);

    if (!existUser) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordValid = await this.Crypt.compare(
      authDto.password,
      existUser.password,
    );

    if (isPasswordValid) {
      return existUser;
    }

    throw new UnauthorizedException('Credenciais inválidas.');
  }

  async login(user: AuthenticatedUser) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role ? user.role.name : null,
      permissions:
        user.role && user.role.permissions
          ? user.role.permissions.map((perm) => perm.name)
          : [],
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
