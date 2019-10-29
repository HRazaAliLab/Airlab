import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblFile",
})
export class FileEntity {
  @PrimaryGeneratedColumn({
    name: "filFileId",
  })
  id: number;

  @Column({
    name: "filExtension",
  })
  extension: string;

  @Column({
    name: "filHash",
  })
  hash: string;

  @Column({
    name: "filUrl",
  })
  url: string;

  @Column({
    name: "filPartId",
  })
  partId: number;

  @Column({
    name: "filSize",
  })
  size: number;

  @Column({
    name: "catchedInfo",
  })
  catchedInfo: string;

  @Column({
    name: "createdBy",
  })
  createdBy: number;

  @Column({
    name: "groupId",
  })
  groupId: number;

  @ManyToOne(type => GroupEntity, group => group.plates, {
    eager: false,
  })
  @JoinColumn({ name: "groupId" })
  group: GroupEntity;
}
