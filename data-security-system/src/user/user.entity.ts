import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractWithIdEntity } from 'data/entities/abstract.entity';
import { Session } from 'session/session.entity';

@Entity()
export class User extends AbstractWithIdEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
  })
  sessions: Session[];
}
