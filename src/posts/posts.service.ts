import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PostEntity } from './posts.entity';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import _ from 'lodash';
import { PostsQuery } from './dto/posts-query.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly PostsRepo: Repository<PostEntity>,
  ) {}

  async findAll(option): Promise<[PostEntity[], number]> {
    const {
      pageSize = 10,
      pageNo = 1,
      sortField = 'createdAt',
      sortOrder = 'descend',
    } = option;
    const orderMap = {
      ascend: 'ASC',
      descend: 'DESC',
    };
    const order = { [sortField]: orderMap[sortOrder] };
    // console.log('order is', order)
    return this.PostsRepo.findAndCount({
      take: pageSize,
      skip: pageSize * (pageNo - 1),
      order: order,
      select: [
        'id',
        'title',
        'author',
        'createdAt',
        'updatedAt',
        'isPublic',
        'del',
        'categories',
        'tags',
        'summary',
        'slug',
        'img',
      ],
    });
  }

  findOne(id: string): Promise<PostEntity> {
    return this.PostsRepo.findOne({ where: { id: +id } });
  }

  findPostsByTag(tag: string): Promise<any> {
    return this.PostsRepo.find({
      where: { tags: Like(`%${tag}%`) },
    });
  }

  async findPostsByCategory(
    category: string,
    query: PostsQuery,
  ): Promise<[PostEntity[], number]> {
    const {
      pageSize = 10,
      pageNo = 1,
      sortField = 'createdAt',
      sortOrder = 'ASC',
    } = query;
    return this.PostsRepo.findAndCount({
      where: { categories: Like(`%${category}%`) },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
      order: {
        [sortField]: sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      },
    });

    // return {
    //   data: result,
    //   count: total,
    // };
  }

  public(id: number): Promise<any> {
    return this.PostsRepo.update(id, { isPublic: true });
  }

  create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.title = createPostDto.title;
    post.content = createPostDto.content;
    post.author = createPostDto.author;
    post.categories = JSON.stringify(createPostDto.categories);
    post.tags = JSON.stringify(createPostDto.tags);
    post.summary = createPostDto.summary;
    post.slug = createPostDto.slug;
    post.img = createPostDto.img;
    console.log('post is: ', post);

    return this.PostsRepo.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const updatedAt = Date.now();
    const post = await this.PostsRepo.findOne({ where: { id: +id } });
    const { title, content, isPublic, categories, tags, summary, slug, img } =
      updatePostDto;

    const data = { updatedAt };
    if (!_.isUndefined(title)) {
      Object.assign(data, { title });
    }
    if (!_.isUndefined(content)) {
      Object.assign(data, { content });
    }
    if (!_.isUndefined(isPublic)) {
      Object.assign(data, { isPublic });
    }
    if (!_.isUndefined(categories)) {
      Object.assign(data, { categories: JSON.stringify(categories) });
    }
    if (!_.isUndefined(tags)) {
      Object.assign(data, { tags: JSON.stringify(tags) });
    }
    if (!_.isUndefined(summary)) {
      Object.assign(data, { summary });
    }
    if (!_.isUndefined(slug)) {
      Object.assign(data, { slug });
    }
    if (!_.isUndefined(img)) {
      Object.assign(data, { img });
    }

    this.PostsRepo.merge(post, data);
    return this.PostsRepo.save(post);
  }

  async remove(id: string): Promise<void> {
    await this.PostsRepo.delete(id);
  }
}
