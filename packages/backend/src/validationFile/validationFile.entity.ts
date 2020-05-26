import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ValidationEntity } from "../validation/validation.entity";

@Entity({
  name: "validation_file",
})
export class ValidationFileEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "validation_id",
  })
  validationId: number;

  @Column({
    name: "created_by",
  })
  createdBy: number;

  @Column({
    name: "hash",
  })
  hash: string;

  @Column({
    name: "size",
  })
  size: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "extension",
  })
  extension: string;

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

  @ManyToOne((type) => ValidationEntity, (validation) => validation.validationFiles)
  @JoinColumn({ name: "validation_id" })
  validation: ValidationEntity;
}
