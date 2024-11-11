import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './posts.service';
import { PostsQuery } from './dto/posts-query.dto';

@Controller('api/posts')
@ApiTags('Blog')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'List of posts' })
  async findAll(@Query() query: PostsQuery) {
    const { pageSize = 10, pageNo = 1 } = query;
    const page = {
      pageSize: Number(pageSize),
      pageNo: Number(pageNo),
    };
    const result = await this.postService.findAll(query);
    result[0].forEach((item) => {
      item.tags = JSON.parse(item.tags);
      item.categories = JSON.parse(item.categories);
    });
    return { data: result[0], count: result[1], ...page };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get blog details' })
  async findOne(@Param('id') id: string) {
    const data = await this.postService.findOne(id);
    data.tags = JSON.parse(data.tags);
    data.categories = JSON.parse(data.categories);
    return { data };
  }

  @Post()
  @ApiOperation({ summary: 'Create post' })
  async create(@Body() createPostDto: CreatePostDto) {
    const data = await this.postService.create(createPostDto);
    return { data };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update post' })
  async update(@Param('id') id: string, @Body() updatePostData: UpdatePostDto) {
    const data = await this.postService.update(id, updatePostData);
    return { data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post' })
  async remove(@Param('id') id: string) {
    const data = await this.postService.remove(id);
    return { data };
  }

  @Get('tags/:tag')
  @ApiOperation({ summary: 'Search articles by tag' })
  async getPostsByTag(@Param('tag') tag: string) {
    const result = await this.postService.findPostsByTag(tag);
    result.forEach((item) => {
      item.tags = JSON.parse(item.tags);
      item.categories = JSON.parse(item.categories);
    });
    return result;
  }

  @Get('categories/:category')
  @ApiOperation({ summary: 'Search articles by category with pagination' })
  async getPostsByCategory(
    @Param('category') category: string,
    @Query() query: PostsQuery,
  ) {
    const {
      pageSize = 10,
      pageNo = 1,
      sortField = 'createdAt',
      sortOrder = 'descend',
    } = query;
    const page = {
      pageSize: Number(pageSize),
      pageNo: Number(pageNo),
      sortField,
      sortOrder,
    };
    const result = await this.postService.findPostsByCategory(category, page);
    result[0].forEach((item) => {
      item.tags = JSON.parse(item.tags);
      item.categories = JSON.parse(item.categories);
    });
    return { data: result[0], count: result[1], ...page };
  }
}
