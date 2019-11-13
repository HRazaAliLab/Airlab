import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "tag",
})
export class TagEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "mw",
  })
  mw: number;

  @Column({
    name: "is_fluorophore",
  })
  isFluorophore: boolean;

  @Column({
    name: "is_metal",
  })
  isMetal: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;
}
