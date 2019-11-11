import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { GroupUserEntity } from "../groupUser/groupUser.entity";

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

  @Exclude()
  @Column({
    name: "activation_key",
    select: false,
  })
  activationKey: string;

  @Column({
    name: "is_active",
  })
  isActive: boolean;

  @Column({
    name: "is_admin",
  })
  isAdmin: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @Column({
    name: "updated_at",
  })
  updatedAt: string;

  @OneToMany(type => GroupUserEntity, groupUser => groupUser.user)
  groupUsers!: GroupUserEntity[];
}
