import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

import { CreateCategory } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepo: Repository<Category>,
  ) {}

  async findAll(option: any): Promise<any> {
    return this.CategoryRepo.find({
      where: { del: false },
    });
  }

  findOne(id: string): Promise<Category> {
    return this.CategoryRepo.findOne({ where: { id: +id } });
  }

  create(createTagDto: CreateCategory): Promise<Category> {
    const tag = new Category();
    const { name, alias, img, desc } = createTagDto;
    Object.assign(tag, { name, alias, img, desc });
    return this.CategoryRepo.save(tag);
  }

  update(id, createTagDto: CreateCategory): Promise<any> {
    return this.CategoryRepo.update(id, createTagDto);
  }

  remove(id: string): Promise<any> {
    return this.CategoryRepo.update(id, { del: true });
  }
}
