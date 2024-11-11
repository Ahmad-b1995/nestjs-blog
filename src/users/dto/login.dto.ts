import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username', example: 'wencai' })
  username: string;

  @ApiProperty({ description: 'Password', example: '123456' })
  password: string;
}
