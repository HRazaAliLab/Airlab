import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblPanel",
})
export class PanelEntity {
  @PrimaryGeneratedColumn({
    name: "panPanelId",
  })
  id: number;

  @Column({
    name: "panName",
  })
  name: string;

  @Column({
    name: "panDetails",
  })
  details: string;

  @Column({
    name: "panFluor",
  })
  fluor: boolean;

  @Column({
    name: "panIsProduction",
  })
  isProduction: boolean;

  @Column({
    name: "panApplication",
  })
  application: boolean;

  @Column({
    name: "panDescription",
  })
  description: string;

  @Column({
    name: "deleted",
  })
  deleted: boolean;

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
