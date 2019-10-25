import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
