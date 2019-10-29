import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblEnsayo",
})
export class EnsayoEntity {
  @PrimaryGeneratedColumn({
    name: "enyEnsayoId",
  })
  id: number;

  @Column({
    name: "enyConclusions",
  })
  conclusions: string;

  @Column({
    name: "enyHypothesis",
  })
  hypothesis: string;

  @Column({
    name: "enyPlanId",
  })
  planId: number;

  @Column({
    name: "enyPurpose",
  })
  purpose: string;

  @Column({
    name: "enyTitle",
  })
  title: string;

  @Column({
    name: "enyTubeValidatedId",
  })
  tubeValidatedId: number;

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
