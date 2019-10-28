import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblPlateWell",
})
export class PlateWellEntity {
  @PrimaryGeneratedColumn({
    name: "pwlPlatewellId",
  })
  id: number;

  @Column({
    name: "pwlPlateId",
  })
  plateId: number;

  @Column({
    name: "pwlPosition",
  })
  position: number;

  @Column({
    name: "pwlText",
  })
  text: string;

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
