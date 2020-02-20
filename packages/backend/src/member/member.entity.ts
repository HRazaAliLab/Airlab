import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { UserEntity } from "../user/user.entity";
import { Exclude } from "class-transformer";

@Entity({
  name: "member",
})
export class MemberEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "group_id",
  })
  groupId: number;

  @Column({
    name: "user_id",
  })
  userId: number;

  @Column({
    name: "role",
  })
  role: number;

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
    name: "all_panels",
  })
  allPanels: boolean;

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

  @ManyToOne(
    type => GroupEntity,
    group => group.members
  )
  @JoinColumn({ name: "group_id" })
  group!: GroupEntity;

  @ManyToOne(
    type => UserEntity,
    user => user.members
  )
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
