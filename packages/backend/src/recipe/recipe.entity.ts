import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblRecipe",
})
export class RecipeEntity {
  @PrimaryGeneratedColumn({
    name: "rcpRecipeId",
  })
  id: number;

  @Column({
    name: "rcpPurpose",
  })
  purpose: string;

  @Column({
    name: "rcpTitle",
  })
  title: string;

  @Column({
    name: "rcpIsPublic",
  })
  isPublic: boolean;

  @Column({
    name: "deleted",
  })
  deleted: boolean;

  @Column({
    name: "dump",
  })
  dump: string;

  @Column({
    name: "dumpsteps",
  })
  dumpsteps: string;

  @Column({
    name: "uriio",
  })
  uriio: string;

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
