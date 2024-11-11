import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategory {
  @ApiProperty({
    description: 'Name of the category',
    example: 'web',
    required: true,
  })
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;

  @ApiProperty({
    description: 'Alias used in URL',
    example: 'web',
    required: true,
  })
  @IsNotEmpty({ message: 'Alias is required' })
  alias: string;

  @ApiProperty({
    description: 'Image for the category',
    required: false,
  })
  @IsOptional()
  img: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'Web development',
    required: false,
  })
  @IsOptional()
  desc: string;
}
