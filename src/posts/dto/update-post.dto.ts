import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Blog title',
    example: 'Blog title',
    required: false,
  })
  title: string;

  @ApiProperty({
    description: 'Blog content',
    example: 'Blog content',
    required: false,
  })
  content: string;

  @ApiProperty({
    description: 'Publish status',
    example: true,
    required: false,
  })
  isPublic: boolean;

  @ApiProperty({
    description: 'Category directory',
    example: ['front-end', 'server'],
  })
  categories: string[];

  @ApiProperty({ description: 'Tags', example: ['JS-API', 'ES6'] })
  tags: string[];

  @ApiProperty({ description: 'Summary' })
  summary: string;

  @ApiProperty({ description: 'Permanent link', example: 'how-to-read-a-book' })
  slug: string;

  @ApiProperty({ description: 'Featured image' })
  @IsOptional()
  img: string;
}
