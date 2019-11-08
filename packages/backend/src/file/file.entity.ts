import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "file",
})
export class FileEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "groupId",
  })
  groupId: number;

  @Column({
    name: "createdBy",
  })
  createdBy: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "extension",
  })
  extension: string;

  @Column({
    name: "size",
  })
  size: number;

  @Column({
    name: "hash",
  })
  hash: string;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @ManyToOne(type => GroupEntity, group => group.files)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;
}
