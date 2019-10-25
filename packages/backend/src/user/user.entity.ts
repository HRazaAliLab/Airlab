import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "tblPerson",
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: "perPersonId",
  })
  id: number;

  @Column({
    name: "perName",
  })
  name: string;

  @Column({
    name: "perLastname",
  })
  lastName: string;

  @Column({
    name: "perPassword",
  })
  password: string;

  @Column({
    name: "zetActivationKey",
  })
  activationKey: string;

  @Column({
    name: "perEmail",
  })
  email: string;

  @Column({
    name: "zetActive",
  })
  active: boolean;
}
