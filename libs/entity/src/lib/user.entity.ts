import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';

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
  // TODO custom validator https://github.com/typestack/class-validator#custom-validation-decorators
  readonly password: string;

  @IsNotEmpty()
  @Column({
    type: "text",
    default: "test@test.com"
  })
  @IsEmail()
  readonly email: string;

  @Column({
    type: "text",
    nullable: true,
  })
  readonly image?: string;
}
