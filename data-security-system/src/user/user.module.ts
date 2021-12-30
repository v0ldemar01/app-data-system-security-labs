import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from 'user/user.service';
import { User } from 'user/user.entity';
import { Session } from 'session/session.entity';
import { SystemLogModule } from 'system-log/system-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session]), SystemLogModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
