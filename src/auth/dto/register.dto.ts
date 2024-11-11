import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Username for the account',
    example: 'wencai',
    required: true,
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @ApiProperty({
    description:
      'Password for the account, which must include at least one number and one uppercase letter.',
    example: 'Pass1234',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)(?=.*[A-Z]).{8,30})/, {
    message:
      'Password must include at least one uppercase letter and one number.',
  })
  password: string;

  @ApiProperty({
    description: 'Optional nickname for the user',
    example: 'zhang',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Nickname must be a string' })
  nickName?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Optional personal description of the user',
    example: 'Developer with 5 years of experience in web technologies.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  desc?: string;

  @ApiProperty({
    description: 'URL of the user’s avatar image',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Avatar must be a valid URL' })
  avatar?: string;
}
