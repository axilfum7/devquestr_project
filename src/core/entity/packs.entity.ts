import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseModel } from "src/common/database";
import { User } from "src/core/entity/users.entity";
import { PackSave } from "src/core/entity/pack_save.entity";

@Entity("packs")
export class Pack extends BaseModel {

  @ManyToOne(() => User, user => user.packs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => PackSave, ps => ps.pack)
  saves: PackSave[];
}
