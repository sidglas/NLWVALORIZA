import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Expose, Exclude } from "class-transformer"

import { v4 as uuid} from "uuid"

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  email: string;

  @Expose({name: "email_Destaque"})
  nameCustom (): string{
    return `** ${this.email}`
  }

  @Column()
  admin: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }

}
export { User }