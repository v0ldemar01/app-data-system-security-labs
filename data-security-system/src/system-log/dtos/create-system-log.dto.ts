import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateSystemLogDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsIn(['ok', 'error'])
  level: string;
}
