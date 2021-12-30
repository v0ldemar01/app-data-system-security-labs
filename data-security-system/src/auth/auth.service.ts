import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from 'auth/constants/auth.constants';
import { User } from 'user/user.entity';
import { UserService } from 'user/user.service';
import { UserDto } from 'user/dtos';
import { SessionService } from 'session/session.service';
import { SystemLogService } from 'system-log/system-log.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly systemLogService: SystemLogService,
  ) {}

  async getAuthenticatedUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      await this.systemLogService.addSystemLog(
        { level: 'error', message: USER_NOT_FOUND_ERROR },
        null,
      );
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      await this.systemLogService.addSystemLog(
        { level: 'error', message: WRONG_PASSWORD_ERROR },
        null,
      );
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    await this.systemLogService.addSystemLog(
      { level: 'ok', message: `${user.email} is authorized` },
      null,
    );
    return user;
  }

  async getCookieWithJwtAccessToken(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${
      this.configService.get('JWT_EXPIRATION_TIME') / 1000
    }`;
  }

  async getJwtAccessToken(id: string, role: string) {
    const accessToken = await this.jwtService.signAsync({ id, role });
    return accessToken;
  }

  async getJwtRefreshToken(id: string) {
    const refreshToken = await this.jwtService.signAsync(
      { id },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      },
    );
    return refreshToken;
  }

  async manageJwtTokensSessions(user: Pick<UserDto, 'id' | 'role'>) {
    const accessToken = await this.getJwtAccessToken(user.id, user.role);
    const refreshToken = await this.getJwtRefreshToken(user.id);
    const prevSession = await this.sessionService.getSessionByUserId(user.id);
    if (prevSession) {
      await this.sessionService.updateUserSession(prevSession.id, {
        ...prevSession,
        accessToken,
        refreshToken,
      });
    } else {
      await this.sessionService.createUserSession({
        accessToken,
        refreshToken,
        user,
      });
    }
    return {
      accessToken,
      refreshToken,
    };
  }

  async getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
