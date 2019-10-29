import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblReagentInstance",
})
export class ReagentInstanceEntity {
  @PrimaryGeneratedColumn({
    name: "reiReagentInstanceId",
  })
  id: number;

  @Column({
    name: "lotReagentInstanceId",
  })
  lotReagentInstanceId: number;

  @Column({
    name: "lotLotId",
  })
  lotLotId: number;

  @Column({
    name: "reiComertialreagentId",
  })
  commertialReagentId: number;

  @Column({
    name: "reiStatus",
  })
  status: string;

  @Column({
    name: "reiRequestedBy",
  })
  requestedBy: number;

  @Column({
    name: "reiOrderedBy",
  })
  orderedBy: number;

  @Column({
    name: "reiApprovedBy",
  })
  approvedBy: number;

  @Column({
    name: "reiReceivedBy",
  })
  receivedBy: number;

  @Column({
    name: "reiRequestedAt",
  })
  requestedAt: string;

  @Column({
    name: "reiOrderedAt",
  })
  orderedAt: string;

  @Column({
    name: "reiApprovedAt",
  })
  approvedAt: string;

  @Column({
    name: "reiReceivedAt",
  })
  receivedAt: string;

  @Column({
    name: "reiPurpose",
  })
  purpose: string;

  @Column({
    name: "reiExpirationDate",
  })
  expirationDate: string;

  @Column({
    name: "createdAt",
  })
  createdAt: string;

  @Column({
    name: "tubPlaceId",
  })
  tubPlaceId: number;

  @Column({
    name: "tubFinishedAt",
  })
  tubFinishedAt: string;

  @Column({
    name: "tubFinishedBy",
  })
  tubFinishedBy: number;

  @Column({
    name: "tubIsLow",
  })
  tubIsLow: boolean;

  @Column({
    name: "lotCellsValidation",
  })
  lotCellsValidation: string;

  @Column({
    name: "lotCloneId",
  })
  lotCloneId: number;

  @Column({
    name: "lotConcentration",
  })
  lotConcentration: string;

  @Column({
    name: "lotDataSheetLink",
  })
  lotDataSheetLink: string;

  @Column({
    name: "lotExpirationDate",
  })
  lotExpirationDate: string;

  @Column({
    name: "lotHasCarrier",
  })
  lotHasCarrier: string;

  @Column({
    name: "lotNumber",
  })
  lotNumber: string;

  @Column({
    name: "lotProviderId",
  })
  lotProviderId: number;

  @Column({
    name: "lotConditions",
  })
  lotConditions: string;

  @Column({
    name: "lotBuffer",
  })
  lotBuffer: string;

  @Column({
    name: "deleted",
  })
  deleted: boolean;

  @Column({
    name: "inactivatedAt",
  })
  inactivatedAt: string;

  @Column({
    name: "inactivatedBy",
  })
  inactivatedBy: number;

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
