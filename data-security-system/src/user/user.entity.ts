import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractWithIdEntity } from 'data/entities/abstract.entity';
import { Session } from 'session/session.entity';
import { Question } from 'question/question.entity';
import { SystemLog } from 'system-log/system-log.entity';

@Entity()
export class User extends AbstractWithIdEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: 0 })
  attemptErrorAuthNumber: number;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
  })
  sessions: Session[];

  @OneToMany(() => Question, (question) => question.user, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => SystemLog, (systemLog) => systemLog.user, {
    cascade: true,
  })
  systemLogs: SystemLog[];
}
