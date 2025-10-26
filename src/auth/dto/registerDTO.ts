import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class registerDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
