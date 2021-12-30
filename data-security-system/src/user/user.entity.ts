import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractWithIdEntity } from 'data/entities/abstract.entity';
import { Session } from 'session/session.entity';
import { Question } from 'question/question.entity';

@Entity()
export class User extends AbstractWithIdEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  attemptAuthNumber: number;

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
}
