import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupEntity } from "../group/group.entity";
import { UserEntity } from "../user/user.entity";

@Entity({
  name: "tblZGroupPerson",
})
export class GroupUserEntity {
  @PrimaryGeneratedColumn({
    name: "gpeGroupPersonId",
  })
  id: number;

  @Column({
    name: "gpeGroupId",
  })
  groupId: number;

  @Column({
    name: "gpePersonId",
  })
  userId: number;

  @Column({
    name: "gpeRole",
  })
  role: number;

  @Column({
    name: "gpeActiveInGroup",
  })
  activeInGroup: boolean;

  @Column({
    name: "catchedInfo",
  })
  catchedInfo: string;

  @Column({
    name: "gpeOrders",
  })
  gpeOrders: boolean;

  @Column({
    name: "gpeErase",
  })
  gpeErase: boolean;

  @Column({
    name: "gpeFinances",
  })
  gpeFinances: boolean;

  @Column({
    name: "gpeAllPanels",
  })
  gpeAllPanels: boolean;

  @ManyToOne(type => GroupEntity, group => group.groupUsers)
  @JoinColumn({ name: "gpeGroupId" })
  group!: GroupEntity;

  @ManyToOne(type => UserEntity, user => user.groupUsers)
  @JoinColumn({ name: "gpePersonId" })
  user!: UserEntity;
}
