import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './media.entity';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly MediaRepo: Repository<Media>,
  ) {}

  async findAll(): Promise<Media[]> {
    return this.MediaRepo.find({
      where: { del: false },
    });
  }

  async findOne(id: string): Promise<Media> {
    return this.MediaRepo.findOne({ where: { id: +id } });
  }

  async create(file: Express.Multer.File): Promise<Media> {
    const media = this.MediaRepo.create({
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      url: `/uploads/${file.filename}`, // Assuming files are served from /uploads
      date: new Date(),
    });
    await this.MediaRepo.save(media);
    return media;
  }

  async remove(id: string): Promise<void> {
    const media = await this.findOne(id);
    if (media) {
      const fullPath = join(__dirname, '../../uploads', media.filename);
      await fsPromises.unlink(fullPath);
      await this.MediaRepo.remove(media);
    }
  }

  async removeList(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this.remove(id));
    await Promise.all(promises);
  }
}
