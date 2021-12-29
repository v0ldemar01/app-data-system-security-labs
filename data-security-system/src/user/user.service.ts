import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'data/entities/session.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
import { User } from 'user/user.entity';
import { CreateUserDto, UserDto } from 'user/dtos';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: string) {
    const entity = await this.userRepository.findOne({ id });
    if (entity) {
      return UserMapper.mapEntityToDTO(entity);
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserIfTokensMatches(
    userId,
    accessToken: string,
    refreshToken: string,
  ) {
    const entity = await this.sessionRepository
      .createQueryBuilder('user')
      .select(['id'])
      .where('user.id = :userId', { userId })
      .andWhere((qb) => {
        const subQuerySessionId = qb
          .subQuery()
          .select('session.id')
          .from(Session, 'session')
          .where('session.accessToken = :accessToken', { accessToken })
          .andWhere('user.refreshToken = :refreshToken', { refreshToken })
          .getQuery();
        return 'user.sessionId IN ' + subQuerySessionId;
      })
      .getRawOne();
    if (entity) {
      return UserMapper.mapEntityToDTO(entity);
    }
    throw new HttpException(
      'Session for current user does not exist',
      HttpStatus.NOT_FOUND,
    );
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
    const existingUser = await this.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User already exist');
    }
  }
}
