import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from 'session/session.entity';
import { CreateSessionDto, SessionDto } from 'session/dtos';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  getSessionByUserId(userId: string) {
    return this.sessionRepository.findOne({ where: { userId } });
  }

  createUserSession(data: CreateSessionDto) {
    return this.sessionRepository.save(data);
  }

  updateUserSession(id: string, data: SessionDto) {
    return this.sessionRepository.update(id, data);
  }

  deleteUserSession(userId: string) {
    return this.sessionRepository.delete({ userId });
  }
}
