import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class Abstract {
  @ApiProperty({
    description: 'ID of record',
    example: 100,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Date of creation' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ description: 'Date of update' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
