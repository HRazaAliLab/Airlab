import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "species",
})
export class SpeciesEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "group_id",
  })
  groupId: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "acronym",
  })
  acronym: string;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @ManyToOne((type) => GroupEntity, (group) => group.species)
  @JoinColumn({ name: "group_id" })
  group!: GroupEntity;
}
