import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { ReagentEntity } from "../reagent/reagent.entity";
import { ProviderEntity } from "../provider/provider.entity";
import { CloneEntity } from "../clone/clone.entity";

@Entity({
  name: "lot",
})
export class LotEntity {
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
    name: "reagent_id",
  })
  reagentId: number;

  @Column({
    name: "provider_id",
  })
  providerId: number;

  @Column({
    name: "clone_id",
  })
  cloneId: number;

  @Column({
    name: "requested_by",
  })
  requestedBy: number;

  @Column({
    name: "approved_by",
  })
  approvedBy: number;

  @Column({
    name: "ordered_by",
  })
  orderedBy: number;

  @Column({
    name: "received_by",
  })
  receivedBy: number;

  @Column({
    name: "finished_by",
  })
  finishedBy: number;

  @Column({
    name: "number",
  })
  number: string;

  @Column({
    name: "status",
  })
  status: string;

  @Column({
    name: "purpose",
  })
  purpose: string;

  @Column({
    name: "link",
  })
  link: string;

  @Column({
    name: "requested_at",
  })
  requestedAt: string;

  @Column({
    name: "approved_at",
  })
  approvedAt: string;

  @Column({
    name: "ordered_at",
  })
  orderedAt: string;

  @Column({
    name: "received_at",
  })
  receivedAt: string;

  @Column({
    name: "finished_at",
  })
  finishedAt: string;

  @Column({
    name: "is_low",
  })
  isLow: boolean;

  @Column({
    name: "is_deleted",
    select: false,
  })
  isDeleted: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
    select: false,
  })
  meta: object;

  @Column({
    name: "created_at",
    select: false,
  })
  createdAt: string;

  @Column({
    name: "updated_at",
    select: false,
  })
  updatedAt: string;

  @ManyToOne(type => GroupEntity, group => group.lots)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @ManyToOne(type => ReagentEntity)
  @JoinColumn({ name: "reagent_id" })
  reagent: ReagentEntity;

  @ManyToOne(type => ProviderEntity)
  @JoinColumn({ name: "provider_id" })
  provider: ProviderEntity;

  @ManyToOne(type => CloneEntity)
  @JoinColumn({ name: "clone_id" })
  clone: CloneEntity;
}