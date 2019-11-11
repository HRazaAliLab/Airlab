import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "provider",
})
export class ProviderEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "name",
  })
  name: string;

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
