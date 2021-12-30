import { IsUUID, ValidateNested } from 'class-validator';
import { CreateSystemLogDto } from 'system-log/dtos';
import { UserDto } from 'user/dtos';

export class SystemLogDto extends CreateSystemLogDto {
  @IsUUID()
  id: string;

  @ValidateNested()
  user: UserDto;
}
