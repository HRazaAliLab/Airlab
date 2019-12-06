import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { MemberEntity } from "../member/member.entity";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "email",
    select: false,
  })
  email: string;

  @Column({
    name: "name",
  })
  name: string;

  @Exclude()
  @Column({
    name: "password",
    select: false,
  })
  password: string;

  @Column({
    name: "is_active",
    select: false,
  })
  isActive: boolean;

  @Column({
    name: "is_admin",
    select: true,
  })
  isAdmin: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
    select: false,
  })
  meta: object;

  @Column({
    name: "created_at",
    select: false,
  })
  createdAt: string;

  @Column({
    name: "updated_at",
    select: false,
  })
  updatedAt: string;

  @OneToMany(
    type => MemberEntity,
    member => member.user,
    { eager: true }
  )
  members!: MemberEntity[];
}
