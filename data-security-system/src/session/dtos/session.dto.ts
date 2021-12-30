import { IsUUID } from 'class-validator';
import { CreateSessionDto } from 'session/dtos/create-session.dto';

export class SessionDto extends CreateSessionDto {
  @IsUUID()
  id: string;
}
