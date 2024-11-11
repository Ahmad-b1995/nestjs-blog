import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostsController],
  providers: [PostService],
})
export class PostsModule {}
