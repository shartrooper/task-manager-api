import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  username: string;
  userId: string;
}

interface JwtPayload {
  username: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJWT(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(
    jwtPayload: JwtPayload,
  ): Promise<{ userId: string; username: string }> {
    return { userId: jwtPayload.sub, username: jwtPayload.username };
  }
}
