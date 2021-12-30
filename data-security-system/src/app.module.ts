import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { QuestionModule } from './question/question.module';
import { SystemLogModule } from './system-log/system-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UserModule,
    AuthModule,
    SessionModule,
    QuestionModule,
    SystemLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
