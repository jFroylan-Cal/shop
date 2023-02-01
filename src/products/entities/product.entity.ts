import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Genders } from '../../common/enums/gender.enum';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  title: string;

  @Column({ type: 'float', default: 0 })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', unique: true })
  slug: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'text', array: true })
  sizes: string[];

  @Column({
    type: 'enum',
    enum: Genders,
    default: Genders.MALE,
    nullable: true,
  })
  gender: Genders;

  @BeforeInsert()
  checkSlug() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
