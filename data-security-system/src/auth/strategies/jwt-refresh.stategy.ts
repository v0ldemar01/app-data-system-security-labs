import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { UserService } from 'user/user.service';
import { UserDto } from 'user/dtos';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest) => (request?.body as any)?.refreshToken,
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: FastifyRequest, { id }: Pick<UserDto, 'id'>) {
    const accessToken = request?.cookies?.Authentication;
    const refreshToken = (request?.body as any)?.refreshToken;
    return this.userService.getUserIfTokensMatches(
      id,
      accessToken,
      refreshToken,
    );
  }
}
