import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { UserEntity } from "../user/user.entity";
import { TagEntity } from "../tag/tag.entity";

@Entity({
  name: "tblLabeledAntibody",
})
export class ConjugateEntity {
  @PrimaryGeneratedColumn({
    name: "labLabeledAntibodyId",
  })
  id: number;

  @Column({
    name: "labCellsUsedForValidation",
  })
  cellsUsedForValidation: string;

  @Column({
    name: "labConcentration",
  })
  concentration: string;

  @Column({
    name: "labContributorId",
  })
  contributorId: string;

  @Column({
    name: "labCytobankLink",
  })
  cytobankLink: string;

  @Column({
    name: "labCytofStainingConc",
  })
  cytofStainingConc: string;

  @Column({
    name: "labDateOfLabeling",
  })
  dateOfLabeling: string;

  @Column({
    name: "labLabbookRef",
  })
  labbookRef: string;

  @Column({
    name: "labLotId",
  })
  lotId: number;

  @Column({
    name: "labTagId",
  })
  tagId: number;

  @Column({
    name: "labWorkingCondition",
  })
  workingCondition: string;

  @Column({
    name: "labBBTubeNumber",
  })
  bbTubeNumber: number;

  @Column({
    name: "labRelabeled",
  })
  relabeled: boolean;

  @Column({
    name: "tubPlaceId",
  })
  tubPlaceId: number;

  @Column({
    name: "tubFinishedBy",
  })
  tubFinishedBy: number;

  @Column({
    name: "tubFinishedAt",
  })
  tubFinishedAt: string;

  @Column({
    name: "tubIsLow",
  })
  tubIsLow: boolean;

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

  @ManyToOne(type => GroupEntity, group => group.plates)
  @JoinColumn({ name: "groupId" })
  group: GroupEntity;

  @ManyToOne(type => UserEntity, user => user.conjugates)
  @JoinColumn({ name: "labContributorId" })
  user: UserEntity;

  @ManyToOne(type => TagEntity, tag => tag.conjugates)
  @JoinColumn({ name: "labTagId" })
  tag: TagEntity;
}
