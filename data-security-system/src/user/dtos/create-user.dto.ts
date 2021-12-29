import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsIn,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password too weak ' +
      'At least one upper case English letter ' +
      'At least one lower case English letter ' +
      'At least one digit ' +
      'At least one special character ' +
      'Minimum eight in length',
  })
  password: string;

  @IsOptional()
  @IsIn(['user', 'admin'])
  role: string;
}
