import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "src/common/database";
import { Question } from "src/core/entity/questions.entity";

@Entity("direction")
export class Direction extends BaseModel {

  @Column()
  name: string;

  @OneToMany(() => Question, question => question.direction)
  questions: Question[];
}






