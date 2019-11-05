import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { ProteinEntity } from "../protein/protein.entity";
import { SpeciesEntity } from "../species/species.entity";

@Entity({
  name: "tblClone",
})
export class CloneEntity {
  @PrimaryGeneratedColumn({
    name: "cloCloneId",
  })
  id: number;

  @Column({
    name: "cloBindingRegion",
  })
  bindingRegion: string;

  @Column({
    name: "cloEpitopeId",
  })
  epitopeId: number;

  @Column({
    name: "cloIsotype",
  })
  isotype: string;

  @Column({
    name: "cloIsPhospho",
  })
  isPhospho: boolean;

  @Column({
    name: "cloIsPolyclonal",
  })
  isPolyclonal: boolean;

  @Column({
    name: "cloName",
  })
  name: string;

  @Column({
    name: "cloProteinId",
  })
  proteinId: number;

  @Column({
    name: "cloSpeciesHost",
  })
  speciesHost: number;

  @Column({
    name: "cloPreferred",
  })
  preferred: number;

  @Column({
    name: "cloReactivity",
  })
  reactivity: string;

  @Column({
    name: "cloApplication",
  })
  application: string;

  @Column({
    name: "deleted",
  })
  deleted: boolean;

  @Column({
    name: "cloPublic",
  })
  public: boolean;

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

  @ManyToOne(type => GroupEntity, group => group.plates)
  @JoinColumn({ name: "groupId" })
  group: GroupEntity;

  @ManyToOne(type => ProteinEntity, protein => protein.clones)
  @JoinColumn({ name: "cloProteinId" })
  protein: ProteinEntity;

  @ManyToOne(type => SpeciesEntity)
  @JoinColumn({ name: "cloSpeciesHost" })
  hostSpecies: SpeciesEntity;
}
