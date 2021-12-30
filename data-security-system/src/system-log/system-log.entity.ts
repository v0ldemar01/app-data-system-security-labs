import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { AbstractWithIdEntity } from 'data/entities/abstract.entity';
import { User } from 'user/user.entity';

@Entity()
export class SystemLog extends AbstractWithIdEntity {
  @Column({ default: 'ok' })
  level: string;

  @Column()
  message: string;

  @RelationId((systemLog: SystemLog) => systemLog.user)
  @Column({ nullable: true })
  readonly userId: string;

  @ManyToOne(() => User, (user) => user.systemLogs, {
    onDelete: 'CASCADE',
  })
  user: User;
}
