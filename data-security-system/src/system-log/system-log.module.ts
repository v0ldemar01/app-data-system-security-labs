import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'user/user.entity';
import { SystemLogService } from 'system-log/system-log.service';
import { SystemLogController } from './system-log.controller';
import { SystemLog } from './system-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemLog, User])],
  controllers: [SystemLogController],
  providers: [SystemLogService],
  exports: [SystemLogService],
})
export class SystemLogModule {}
