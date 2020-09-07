import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { CloneEntity } from "../clone/clone.entity";
import { ConjugateEntity } from "../conjugate/conjugate.entity";
import { ProviderEntity } from "../provider/provider.entity";
import { LotStatus } from "@airlab/shared/lib/lot/LotStatus";
import { MemberEntity } from "../member/member.entity";

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
    name: "clone_id",
  })
  cloneId: number;

  @Column({
    name: "provider_id",
  })
  providerId: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "reference",
  })
  reference: string;

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
  status: LotStatus;

  @Column({
    name: "purpose",
  })
  purpose: string;

  @Column({
    name: "url",
  })
  url: string;

  @Column({
    name: "price",
  })
  price: string;

  @Column({
    name: "note",
  })
  note: string;

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
    name: "is_archived",
    select: false,
  })
  isArchived: boolean;

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

  @ManyToOne((type) => GroupEntity, (group) => group.lots)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @ManyToOne((type) => ProviderEntity)
  @JoinColumn({ name: "provider_id" })
  provider: ProviderEntity;

  @ManyToOne((type) => CloneEntity)
  @JoinColumn({ name: "clone_id" })
  clone: CloneEntity;

  @ManyToOne((type) => MemberEntity)
  @JoinColumn({ name: "requested_by" })
  requestedByMember: MemberEntity;

  @ManyToOne((type) => MemberEntity)
  @JoinColumn({ name: "approved_by" })
  approvedByMember: MemberEntity;

  @ManyToOne((type) => MemberEntity)
  @JoinColumn({ name: "ordered_by" })
  orderedByMember: MemberEntity;

  @ManyToOne((type) => MemberEntity)
  @JoinColumn({ name: "received_by" })
  receivedByMember: MemberEntity;

  @ManyToOne((type) => MemberEntity)
  @JoinColumn({ name: "finished_by" })
  finishedByMember: MemberEntity;

  @OneToMany((type) => ConjugateEntity, (conjugate) => conjugate.lot)
  conjugates: ConjugateEntity[];
}
