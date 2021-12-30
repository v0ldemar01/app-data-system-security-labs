import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { UserService } from 'user/user.service';
import { UserDto } from 'user/dtos';

@Injectable()
export class RefreshQuestionStrategy extends PassportStrategy(
  Strategy,
  'refresh-question',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: true,
    });
  }

  async validate({ id, role }: Pick<UserDto, 'id' | 'role'>) {
    return { id, role };
  }
}
