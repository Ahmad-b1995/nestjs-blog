import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { CategoryService } from './category.service';
import { CreateCategory } from './dto/create-category.dto';

@Controller('api/category')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Categories' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all categories.',
  })
  async getAll() {
    try {
      const categories = await this.categoryService.findAll({});
      return categories;
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create Category' })
  @ApiBody({ type: CreateCategory, description: 'Data for new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data received for category creation.',
  })
  async create(@Body() createDto: CreateCategory) {
    try {
      const category = await this.categoryService.create(createDto);
      return category;
    } catch (error) {
      throw new HttpException(
        'Failed to create category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Category' })
  @ApiParam({ name: 'id', description: 'Category ID', type: String })
  @ApiBody({
    type: CreateCategory,
    description: 'Updated data for existing category',
  })
  @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async update(@Param('id') id: string, @Body() createDto: CreateCategory) {
    try {
      const updatedCategory = await this.categoryService.update(id, createDto);
      if (!updatedCategory) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return updatedCategory;
    } catch (error) {
      throw new HttpException(
        'Failed to update category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Category' })
  @ApiParam({ name: 'id', description: 'Category ID', type: String })
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  async remove(@Param('id') id: string) {
    try {
      const result = await this.categoryService.remove(id);
      if (!result) {
        throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Category deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
