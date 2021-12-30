import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { AbstractWithIdEntity } from 'data/entities/abstract.entity';
import { User } from 'user/user.entity';

@Entity()
export class Question extends AbstractWithIdEntity {
  @Column()
  questionText: string;

  @Column()
  correctAnswer: string;

  @RelationId((question: Question) => question.user)
  @Column()
  readonly userId: string;

  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
