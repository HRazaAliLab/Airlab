import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { ProteinEntity } from "../protein/protein.entity";
import { SpeciesEntity } from "../species/species.entity";

@Entity({
  name: "clone",
})
export class CloneEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "group_id",
  })
  groupId: number;

  @Column({
    name: "created_by",
  })
  createdBy: number;

  @Column({
    name: "protein_id",
  })
  proteinId: number;

  @Column({
    name: "species_id",
  })
  speciesId: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "isotype",
  })
  isotype: string;

  @Column({
    name: "region",
  })
  region: string;

  @Column({
    name: "is_phospho",
  })
  isPhospho: boolean;

  @Column({
    name: "is_polyclonal",
  })
  isPolyclonal: boolean;

  @Column({
    name: "reactivity",
    type: "int",
    array: true,
  })
  reactivity: number[];

  @Column({
    name: "application",
    type: "jsonb",
  })
  application: object;

  @Column({
    name: "is_deleted",
  })
  isDeleted: boolean;

  @Column({
    name: "is_public",
  })
  isPublic: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @Column({
    name: "updated_at",
  })
  updatedAt: string;

  @ManyToOne(type => GroupEntity, group => group.clones)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @ManyToOne(type => ProteinEntity, protein => protein.clones)
  @JoinColumn({ name: "protein_id" })
  protein: ProteinEntity;

  @ManyToOne(type => SpeciesEntity)
  @JoinColumn({ name: "species_id" })
  species: SpeciesEntity;
}
