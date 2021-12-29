import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { AbstractWithIdEntity } from 'data/entities/abstract.entity';
import { User } from 'user/user.entity';

@Entity()
export class Session extends AbstractWithIdEntity {
  @Column()
  accessToken: string;

  @Column({ type: 'uuid' })
  refreshToken: string;

  @Column({ type: 'bigint' })
  expiresIn: number;

  @RelationId((session: Session) => session.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
