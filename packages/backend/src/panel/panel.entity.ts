import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { MemberEntity } from "../member/member.entity";
import { UserEntity } from "../user/user.entity";
import { PanelElementEntity } from "../panelElement/panelElement.entity";

@Entity({
  name: "panel",
})
export class PanelEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "group_id",
  })
  groupId: number;

  @Column({
    name: "created_by",
  })
  createdBy: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "description",
  })
  description: string;

  @Column({
    name: "is_fluorophore",
  })
  isFluorophore: boolean;

  @Column({
    name: "is_locked",
  })
  isLocked: boolean;

  @Column({
    name: "application",
  })
  application: number;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "is_archived",
  })
  isArchived: boolean;

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
    group => group.panels
  )
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @ManyToOne(type => MemberEntity)
  @JoinColumn({ name: "created_by" })
  member: MemberEntity;

  user: UserEntity;

  @OneToMany(
    type => PanelElementEntity,
    element => element.panel
  )
  elements!: PanelElementEntity[];
}
