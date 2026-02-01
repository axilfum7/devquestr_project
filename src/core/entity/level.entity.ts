import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "src/common/database";
import { Question } from "src/core/entity/questions.entity";

@Entity("level")
export class Level extends BaseModel {

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Question, questions => questions.level)
  questions: Question[];
}