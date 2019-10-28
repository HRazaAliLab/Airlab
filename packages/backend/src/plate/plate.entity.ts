import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblPlate",
})
export class PlateEntity {
  @PrimaryGeneratedColumn({
    name: "plaPlateId",
  })
  id: number;

  @Column({
    name: "plaRows",
  })
  rows: number;

  @Column({
    name: "plaColumns",
  })
  columns: number;

  @Column({
    name: "plaPlateName",
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
