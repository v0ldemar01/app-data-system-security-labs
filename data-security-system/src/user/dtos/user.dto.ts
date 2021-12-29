import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: string;
}
