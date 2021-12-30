import {
  IsNotEmpty,
  ValidateNested,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserDto } from 'user/dtos';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ValidateNested()
  user: Pick<UserDto, 'id' | 'role'>;
}
