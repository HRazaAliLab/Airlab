import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "species",
})
export class SpeciesEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

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
}
