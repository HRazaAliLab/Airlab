import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PanelEntity } from "../panel/panel.entity";
import { ConjugateEntity } from "../conjugate/conjugate.entity";

@Entity({
  name: "panel_element",
})
export class PanelElementEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "panel_id",
  })
  panelId: number;

  @Column({
    name: "conjugate_id",
  })
  conjugateId: number;

  @Column({
    name: "dilution_type",
  })
  dilutionType: number;

  @Column({
    name: "concentration",
  })
  concentration?: number;

  @ManyToOne(
    type => PanelEntity,
    panel => panel.elements
  )
  @JoinColumn({ name: "panel_id" })
  panel: PanelEntity;

  @ManyToOne(
    type => ConjugateEntity,
    conjugate => conjugate.elements
  )
  @JoinColumn({ name: "conjugate_id" })
  conjugate: ConjugateEntity;
}
