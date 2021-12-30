import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  attemptErrorAuthNumber: number;

  @IsNotEmpty()
  @IsIn(['user', 'admin'])
  status: string;
}
