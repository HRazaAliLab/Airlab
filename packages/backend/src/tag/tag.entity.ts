import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tag",
})
export class TagEntity {
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
    name: "is_metal",
  })
  isMetal: boolean;

  @Column({
    name: "is_fluorophore",
  })
  isFluorophore: boolean;

  @Column({
    name: "is_enzyme",
  })
  isEnzyme: boolean;

  @Column({
    name: "is_biotin",
  })
  isBiotin: boolean;

  @Column({
    name: "is_other",
  })
  isOther: boolean;

  @Column({
    name: "description",
  })
  description: string;

  @Column({
    name: "mw",
  })
  mw?: number;

  @Column({
    name: "emission",
  })
  emission?: number;

  @Column({
    name: "excitation",
  })
  excitation?: number;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @ManyToOne((type) => GroupEntity, (group) => group.tags)
  @JoinColumn({ name: "group_id" })
  group!: GroupEntity;
}
