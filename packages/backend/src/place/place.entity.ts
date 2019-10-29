import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblPlace",
})
export class PlaceEntity {
  @PrimaryGeneratedColumn({
    name: "plaPlaceId",
  })
  id: number;

  @Column({
    name: "plaName",
  })
  name: string;

  @Column({
    name: "plaParentId",
  })
  parentId: number;

  @Column({
    name: "plaRows",
  })
  rows: number;

  @Column({
    name: "plaColumns",
  })
  columns: number;

  @Column({
    name: "plaSelves",
  })
  selves: number;

  @Column({
    name: "plaTubeId",
  })
  tubeId: number;

  @Column({
    name: "plaType",
  })
  type: string;

  @Column({
    name: "plaX",
  })
  x: number;

  @Column({
    name: "plaY",
  })
  y: number;

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
