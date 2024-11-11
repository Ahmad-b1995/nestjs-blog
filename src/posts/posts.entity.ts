import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ type: 'longtext', nullable: true })
  contentHtml: string;

  @Column({ nullable: true })
  categories: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  summary: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: 'Alex' })
  author: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: false })
  del: boolean;
}
