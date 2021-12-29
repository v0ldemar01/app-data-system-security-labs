import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserDto } from 'user/dtos';

type FastifyRequestAuth = FastifyRequest & {
  user?: UserDto;
};

export const AuthUser = createParamDecorator(
  (data: keyof UserDto, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<FastifyRequestAuth>()
      .user as UserDto;
    return data ? user && user[data] : user;
  },
);
