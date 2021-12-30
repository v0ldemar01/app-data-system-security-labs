import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'config/jwt.config';
import { UserModule } from 'user/user.module';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { JwtStrategy } from 'auth/strategies/jwt.strategy';
import { LocalStrategy } from 'auth/strategies/local.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.stategy';
import { SessionModule } from 'session/session.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    SessionModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, LocalStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
