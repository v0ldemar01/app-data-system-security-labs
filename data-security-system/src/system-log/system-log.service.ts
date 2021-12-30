import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemLog } from 'system-log/system-log.entity';
import { CreateSystemLogDto, SystemLogDto } from 'system-log/dtos';
import { SystemLogMapper } from 'system-log/mappers/system-log.mapper';
import { User } from 'user/user.entity';
import { IGetConfig } from 'common/models';
import { UserDto } from 'user/dtos';

@Injectable()
export class SystemLogService {
  constructor(
    @InjectRepository(SystemLog)
    private readonly systemLogRepository: Repository<SystemLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getSystemLogs(config: IGetConfig): Promise<SystemLogDto[]> {
    const { from: skip, count: take } = config;
    const entities = await this.systemLogRepository.find({
      skip,
      take,
      cache: true,
    });
    return entities.map((entity) => SystemLogMapper.mapEntityToDTO(entity));
  }

  async addSystemLog(systemLog: CreateSystemLogDto, userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return this.systemLogRepository.save({ ...systemLog, user });
  }
}
