import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { UserEntity } from "../user/user.entity";

@Entity({
  name: "group_user",
})
export class GroupUserEntity {
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

  @Column({
    name: "activation_key",
  })
  activationKey: string;

  @Column({
    name: "is_active",
  })
  isActive: boolean;

  @Column({
    name: "can_order",
  })
  canOrder: boolean;

  @Column({
    name: "can_erase",
  })
  canErase: boolean;

  @Column({
    name: "can_finances",
  })
  canFinances: boolean;

  @Column({
    name: "can_panels",
  })
  canPanels: boolean;

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
    group => group.groupUsers
  )
  @JoinColumn({ name: "group_id" })
  group!: GroupEntity;

  @ManyToOne(
    type => UserEntity,
    user => user.groupUsers
  )
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;
}
