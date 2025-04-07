import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password'})
  @IsNotEmpty()
  password: string;
}
