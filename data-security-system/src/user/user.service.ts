import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'session/session.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { User } from 'user/user.entity';
import { CreateUserDto, UserDto } from 'user/dtos';
import { UserMapper } from 'user/mappers/user.mapper';
import {
  SESSION_NOT_FOUND_BY_TOKENS_ERROR,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND_BY_EMAIL_ERROR,
  USER_NOT_FOUND_BY_ID_ERROR,
} from 'user/constants/user.constant';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email, status: 'active' });
    if (user) {
      return user;
    }
    throw new UnauthorizedException(USER_NOT_FOUND_BY_EMAIL_ERROR);
  }

  async getById(id: string) {
    const entity = await this.userRepository.findOne({ id, status: 'active' });
    if (entity) {
      return UserMapper.mapEntityToDTO(entity);
    }
    throw new HttpException(USER_NOT_FOUND_BY_ID_ERROR, HttpStatus.NOT_FOUND);
  }

  async getUserIfTokensMatches(
    userId,
    accessToken: string,
    refreshToken: string,
  ) {
    const entity = await this.userRepository
      .createQueryBuilder('user')
      .select(['id'])
      .where('user.id = :userId', { userId })
      .andWhere('user.status = :status', { status: 'active' })
      .andWhere((qb) => {
        const subQuerySessionId = qb
          .subQuery()
          .select('session.userId')
          .from(Session, 'session')
          .where('session.accessToken = :accessToken', { accessToken })
          .andWhere('session.refreshToken = :refreshToken', { refreshToken })
          .getQuery();
        return 'user.id IN ' + subQuerySessionId;
      })
      .getRawOne();

    if (entity) {
      return UserMapper.mapEntityToDTO(entity);
    }
    throw new UnauthorizedException(SESSION_NOT_FOUND_BY_TOKENS_ERROR);
  }

  async findOne(where: FindOneOptions<User>): Promise<UserDto> {
    return this.userRepository.findOne(where);
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    await this.checkIfUserAlreadyExists(user.email);
    const salt = await genSalt(10);
    const entity = await this.userRepository.save({
      ...user,
      password: await hash(user.password, salt),
    });
    return UserMapper.mapEntityToDTO(entity);
  }

  async checkIfUserAlreadyExists(email: string): Promise<void> {
    const existingUser = await this.findOne({
      where: { email, status: 'active' },
    });
    if (existingUser) {
      throw new ConflictException(USER_ALREADY_EXISTS);
    }
  }

  async increaseErrorAuthAttempt(userId: string): Promise<void> {
    const user = await this.findOne({ where: { id: userId } });
    await this.userRepository.update(userId, {
      ...user,
      attemptAuthNumber: user.attemptAuthNumber + 1,
    });
  }

  async getErrorAuthAttemptNumber(
    userId: string,
  ): Promise<{ attemptAuthNumber: number }> {
    return this.findOne({
      select: ['attemptAuthNumber'],
      where: { id: userId },
    });
  }

  async setUserBlocked(userId: string) {
    const user = await this.findOne({ where: { id: userId } });
    await this.userRepository.update(userId, {
      ...user,
      status: 'blocked',
    });
  }
}
