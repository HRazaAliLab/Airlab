import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { CloneEntity } from "../clone/clone.entity";

@Entity({
  name: "protein",
})
export class ProteinEntity {
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
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @ManyToOne(
    type => GroupEntity,
    group => group.proteins
  )
  @JoinColumn({ name: "group_id" })
  group: GroupEntity;

  @OneToMany(
    type => CloneEntity,
    clone => clone.protein
  )
  clones: CloneEntity[];
}
