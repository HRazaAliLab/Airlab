import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { GroupUserEntity } from "../groupUser/groupUser.entity";
import { LotEntity } from "../lot/lot.entity";
import { UserEntity } from "../user/user.entity";
import { ConjugateEntity } from "../conjugate/conjugate.entity";
import { SpeciesEntity } from "../species/species.entity";
import { ValidationFileEntity } from "../validationFile/validationFile.entity";
import { CloneEntity } from "../clone/clone.entity";

@Entity({
  name: "validation",
})
export class ValidationEntity {
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
    name: "clone_id",
  })
  cloneId: number;

  @Column({
    name: "lot_id",
  })
  lotId: number;

  @Column({
    name: "conjugate_id",
  })
  conjugateId: number;

  @Column({
    name: "species_id",
  })
  speciesId: number;

  @Column({
    name: "file_id",
  })
  fileId: number;

  @Column({
    name: "application",
  })
  application: number;

  @Column({
    name: "positive_control",
  })
  positiveControl: string;

  @Column({
    name: "negative_control",
  })
  negativeControl: string;

  @Column({
    name: "incubation_conditions",
  })
  incubationConditions: string;

  @Column({
    name: "concentration",
  })
  concentration: string;

  @Column({
    name: "concentration_unit",
  })
  concentrationUnit: string;

  @Column({
    name: "tissue",
  })
  tissue: string;

  @Column({
    name: "fixation",
  })
  fixation: number;

  @Column({
    name: "fixation_notes",
  })
  fixationNotes: string;

  @Column({
    name: "notes",
  })
  notes: string;

  @Column({
    name: "status",
  })
  status: number;

  @Column({
    name: "antigen_retrieval_type",
  })
  antigenRetrievalType: string;

  @Column({
    name: "antigen_retrieval_time",
  })
  antigenRetrievalTime: string;

  @Column({
    name: "antigen_retrieval_temperature",
  })
  antigenRetrievalTemperature: string;

  @Column({
    name: "saponin",
  })
  saponin?: boolean;

  @Column({
    name: "saponin_concentration",
  })
  saponinConcentration?: string;

  @Column({
    name: "methanol_treatment",
  })
  methanolTreatment?: boolean;

  @Column({
    name: "methanol_treatment_concentration",
  })
  methanolTreatmentConcentration?: string;

  @Column({
    name: "surface_staining",
  })
  surfaceStaining?: boolean;

  @Column({
    name: "surface_staining_concentration",
  })
  surfaceStainingConcentration?: string;

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

  @ManyToOne(type => GroupEntity)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @ManyToOne(type => GroupUserEntity)
  @JoinColumn({ name: "created_by" })
  groupUser: GroupUserEntity;

  user: UserEntity;

  @ManyToOne(type => CloneEntity)
  @JoinColumn({ name: "clone_id" })
  clone: CloneEntity;

  @ManyToOne(type => LotEntity)
  @JoinColumn({ name: "lot_id" })
  lot: LotEntity;

  @ManyToOne(type => ConjugateEntity)
  @JoinColumn({ name: "conjugate_id" })
  conjugate: ConjugateEntity;

  @ManyToOne(type => SpeciesEntity)
  @JoinColumn({ name: "species_id" })
  species: SpeciesEntity;

  @ManyToOne(type => ValidationFileEntity)
  @JoinColumn({ name: "file_id" })
  file: ValidationFileEntity;

  @OneToMany(
    type => ValidationFileEntity,
    validationFile => validationFile.validation
  )
  validationFiles: ValidationFileEntity[];
}
