import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ProductImage } from './product-image.entity';
@Entity({ name: 'Products' })
export class Product {
  @ApiProperty({
    example: 'sdf45sdf-45a4-as5d-weda3a4d5254g4bf4yt5r',
    description: 'Product UUID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'La cucaracha',
    description: 'A song of a cucarache',
    uniqueItems: true,
  })
  @Column({ type: 'text', unique: true })
  title: string;

  @ApiProperty({
    example: '10.99',
    description: 'Price for song',
    type: Number,
    default: 0,
  })
  @Column({ type: 'float', default: 0 })
  price: number;

  @ApiProperty({
    example: 'Description of a song',
    type: String,
    nullable: true,
    description: 'Description of a song',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: 'text', unique: true })
  slug: string;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  stock: number;

  @ApiProperty()
  @Column({ type: 'text', array: true })
  sizes: string[];

  @ApiProperty()
  @Column({ type: 'text', array: true })
  gender: string[];

  @ApiProperty()
  @Column({ type: 'text', array: true, default: [] })
  tags: string[];

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug.toLowerCase().replace(/ /g, '_').replace(/ /g, '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug.toLowerCase().replace(/ /g, '_').replace(/ /g, '');
  }
}
