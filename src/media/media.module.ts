import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { Media } from './media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';
import { FILE_UPLOADS_DIR } from 'src/constants/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: FILE_UPLOADS_DIR,
          filename: (req, file, cb) => {
            crypto.pseudoRandomBytes(16, (err, raw) => {
              const date = new Date();
              const time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
              const name = `${time}-${raw.toString('hex').substring(0, 8)}-${file.originalname}`;
              cb(err, err ? undefined : name);
            });
          },
        }),
      }),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
