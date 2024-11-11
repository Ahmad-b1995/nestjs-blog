import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TagsService } from './tags.service';
import { CreateTag } from './dto/create-tag.dto';

@Controller('api/tags')
@ApiTags('Tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  @ApiOperation({ summary: 'Tag list' })
  async getAll() {
    const result = await this.tagsService.findAll({});
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Create new tag' })
  async create(@Body() createDto: CreateTag) {
    const result = await this.tagsService.create(createDto);
    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update tag' })
  async update(@Param('id') id: string, @Body() createDto: CreateTag) {
    const result = await this.tagsService.update(id, createDto);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete tag' })
  async remove(@Param('id') id: string) {
    const result = await this.tagsService.remove(id);
    return result;
  }
}
