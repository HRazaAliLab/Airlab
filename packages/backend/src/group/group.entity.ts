import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProteinEntity } from "../protein/protein.entity";
import { MemberEntity } from "../member/member.entity";
import { CloneEntity } from "../clone/clone.entity";
import { ConjugateEntity } from "../conjugate/conjugate.entity";
import { LotEntity } from "../lot/lot.entity";
import { PanelEntity } from "../panel/panel.entity";
import { SpeciesEntity } from "../species/species.entity";
import { TagEntity } from "../tag/tag.entity";
import { ProviderEntity } from "../provider/provider.entity";

@Entity({
  name: "group",
})
export class GroupEntity {
  @PrimaryGeneratedColumn({
    name: "id",
  })
  id: number;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "institution",
  })
  institution: string;

  @Column({
    name: "url",
  })
  url: string;

  @Column({
    name: "is_open",
  })
  isOpen: boolean;

  @Column({
    name: "meta",
    type: "jsonb",
  })
  meta: object;

  @Column({
    name: "created_at",
  })
  createdAt: string;

  @OneToMany(
    type => SpeciesEntity,
    species => species.group
  )
  species: SpeciesEntity[];

  @OneToMany(
    type => TagEntity,
    tag => tag.group
  )
  tags: TagEntity[];

  @OneToMany(
    type => ProviderEntity,
    provider => provider.group
  )
  providers: ProviderEntity[];

  @OneToMany(
    type => ProteinEntity,
    protein => protein.group
  )
  proteins: ProteinEntity[];

  @OneToMany(
    type => CloneEntity,
    clone => clone.group
  )
  clones: CloneEntity[];

  @OneToMany(
    type => LotEntity,
    lot => lot.group
  )
  lots: LotEntity[];

  @OneToMany(
    type => ConjugateEntity,
    conjugate => conjugate.group
  )
  conjugates: ConjugateEntity[];

  @OneToMany(
    type => PanelEntity,
    panel => panel.group
  )
  panels: PanelEntity[];

  @OneToMany(
    type => MemberEntity,
    member => member.group
  )
  members!: MemberEntity[];
}
