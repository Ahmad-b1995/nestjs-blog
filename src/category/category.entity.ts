import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: false })
  del: boolean;
}
