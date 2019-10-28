import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblProvider",
})
export class ProviderEntity {
  @PrimaryGeneratedColumn({
    name: "proProviderId",
  })
  id: number;

  @Column({
    name: "proAcronym",
  })
  acronym: string;

  @Column({
    name: "proName",
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
