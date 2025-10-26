import { IsNotEmpty, IsString } from 'class-validator';

export class loginDTO {
  id?: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
