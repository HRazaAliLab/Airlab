import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblSpecies",
})
export class SpeciesEntity {
  @PrimaryGeneratedColumn({
    name: "spcSpeciesId",
  })
  id: number;

  @Column({
    name: "spcAcronym",
  })
  acronym: string;

  @Column({
    name: "spcName",
  })
  name: string;

  @Column({
    name: "spcLinnaeus",
  })
  linnaeus: string;

  @Column({
    name: "spcProperAcronym",
  })
  properAcronym: string;

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
