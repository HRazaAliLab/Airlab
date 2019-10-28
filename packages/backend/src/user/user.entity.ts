import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

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

  @Exclude()
  @Column({
    name: "perPassword",
  })
  password: string;

  @Exclude()
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
