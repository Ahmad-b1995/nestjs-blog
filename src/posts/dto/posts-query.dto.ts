import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PostsQuery {
  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  pageSize?: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  pageNo?: number;

  @ApiProperty({
    description: 'Sorting field',
    example: 'createdAt',
    default: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiProperty({
    description: 'Sort order',
    example: 'descend',
    default: 'descend',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortOrder?: string;

  @ApiProperty({
    description: 'Category to filter posts',
    example: 'Technology',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
}
