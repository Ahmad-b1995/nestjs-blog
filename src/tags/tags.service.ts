import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './tags.entity';

import { CreateTag } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tags)
    private readonly TagsRepo: Repository<Tags>,
  ) {}

  async findAll(option: any): Promise<any> {
    return this.TagsRepo.find({
      where: { del: false },
    });
  }

  findOne(id: string): Promise<Tags> {
    return this.TagsRepo.findOne({ where: { id: +id } });
  }

  create(createTagDto: CreateTag): Promise<Tags> {
    const tag = new Tags();
    const { name, alias, img, desc } = createTagDto;
    Object.assign(tag, { name, alias, img, desc });
    return this.TagsRepo.save(tag);
  }

  update(id, createTagDto: CreateTag): Promise<any> {
    return this.TagsRepo.update(id, createTagDto);
  }

  remove(id: string): Promise<any> {
    return this.TagsRepo.update(id, { del: true });
  }
}
