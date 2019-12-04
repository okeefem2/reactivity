import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

// https://github.com/typestack/class-validator#validation-decorators
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @IsNotEmpty()
  @Column('text')
  readonly username: string;

  @IsNotEmpty()
  @Column('text')
  readonly password: string;
}
