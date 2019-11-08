import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "panel",
})
export class PanelEntity {
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
    name: "name",
  })
  name: string;

  @Column({
    name: "description",
  })
  description: string;

  @Column({
    name: "details",
    type: "jsonb",
  })
  details: object;

  @Column({
    name: "is_fluor",
  })
  isFluor: boolean;

  @Column({
    name: "is_production",
  })
  isProduction: boolean;

  @Column({
    name: "application",
  })
  application: number;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "is_deleted",
  })
  isDeleted: boolean;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @ManyToOne(type => GroupEntity, group => group.panels)
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;
}
