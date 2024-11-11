import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Username', example: 'Tom' })
  username: string;

  @ApiProperty({ description: 'Real name', example: 'David' })
  nickName: string;

  @ApiProperty({ description: 'Email', example: 'David' })
  email: string;

  @ApiProperty({ description: 'Personal description', example: 'David' })
  desc: string;

  @ApiProperty({ description: 'Avatar', example: 'David' })
  avatar: string;
}
