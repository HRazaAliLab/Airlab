import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "reagent",
})
export class ReagentEntity {
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
    name: "is_deleted",
  })
  isDeleted: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @ManyToOne(type => GroupEntity, group => group.reagents)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;
}
