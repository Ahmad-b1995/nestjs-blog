import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username for the account',
    example: 'admin',
    required: true,
  })
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @ApiProperty({
    description: 'Password for the account',
    example: '123456',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
