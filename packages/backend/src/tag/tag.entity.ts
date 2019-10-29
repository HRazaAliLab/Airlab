import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblTag",
})
export class TagEntity {
  @PrimaryGeneratedColumn({
    name: "tagTagId",
  })
  id: number;

  @Column({
    name: "tagEmission",
  })
  emission: string;

  @Column({
    name: "tagExcitation",
  })
  excitation: string;

  @Column({
    name: "tagIsFluorphore",
  })
  isFluorphore: boolean;

  @Column({
    name: "tagIsMetal",
  })
  isMetal: boolean;

  @Column({
    name: "tagMW",
  })
  mw: string;

  @Column({
    name: "tagName",
  })
  name: string;

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
