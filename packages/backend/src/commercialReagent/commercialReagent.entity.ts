import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";

@Entity({
  name: "tblComertialReagent",
})
export class CommercialReagentEntity {
  @PrimaryGeneratedColumn({
    name: "comComertialReagentId",
  })
  id: number;

  @Column({
    name: "comName",
  })
  name: string;

  @Column({
    name: "comProviderId",
  })
  providerId: number;

  @Column({
    name: "comReference",
  })
  reference: string;

  @Column({
    name: "comIsFavorite",
  })
  isFavorite: boolean;

  @Column({
    name: "deleted",
  })
  deleted: boolean;

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
