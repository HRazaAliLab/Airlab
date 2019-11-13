import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { TagEntity } from "../tag/tag.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { LotEntity } from "../lot/lot.entity";
import { UserEntity } from "../user/user.entity";

@Entity({
  name: "conjugate",
})
export class ConjugateEntity {
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
    name: "lot_id",
  })
  lotId: number;

  @Column({
    name: "tag_id",
  })
  tagId: number;

  @Column({
    name: "finished_by",
  })
  finishedBy: number;

  @Column({
    name: "finished_at",
  })
  finishedAt: string;

  @Column({
    name: "tube_number",
  })
  tubeNumber: number;

  @Column({
    name: "concentration",
  })
  concentration: string;

  @Column({
    name: "description",
  })
  description: string;

  @Column({
    name: "is_deleted",
  })
  isDeleted: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "labeled_at",
  })
  labeledAt: string;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @Column({
    name: "updated_at",
  })
  updatedAt: string;

  @ManyToOne(type => GroupEntity, group => group.conjugates)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @ManyToOne(type => GroupUserEntity)
  @JoinColumn({ name: "created_by" })
  groupUser: GroupUserEntity;

  user: UserEntity;

  @ManyToOne(type => TagEntity)
  @JoinColumn({ name: "tag_id" })
  tag: TagEntity;

  @ManyToOne(type => LotEntity)
  @JoinColumn({ name: "lot_id" })
  lot: LotEntity;
}
