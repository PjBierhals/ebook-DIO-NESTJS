import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthDto } from '../dto/auth.dto';

interface AuthenticatedUser {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: {
    id: string;
    name: string;
    permissions: { id: string; name: string }[];
  };
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<AuthenticatedUser> {
    const authDto: AuthDto = { email, password };
    const user = await this.authService.validateUser(authDto);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result as AuthenticatedUser;
  }
}
