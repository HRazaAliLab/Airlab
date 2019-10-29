import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblSpeciesProtein",
})
export class SpeciesProteinEntity {
  @PrimaryGeneratedColumn({
    name: "sppSpeciesProteinId",
  })
  id: number;

  @Column({
    name: "sppProteinId",
  })
  proteinId: number;

  @Column({
    name: "sppSpeciesId",
  })
  speciesId: number;

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
