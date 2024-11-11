import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Blog title', example: 'Blog title' })
  @IsNotEmpty({ message: 'Please enter the title' })
  title: string;

  @ApiProperty({ description: 'Blog content', example: 'Blog content' })
  @IsNotEmpty({ message: 'Please enter the blog content' })
  content: string;

  @ApiProperty({ description: 'Blog author', example: 'Alex' })
  author: string;

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

  @ApiProperty({ description: 'Featured image', example: 'how-to-read-a-book' })
  @IsOptional()
  img: string;
}
