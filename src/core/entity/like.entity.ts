import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "src/common/database";
import { User } from "src/core/entity/users.entity";
import { Question } from "src/core/entity/questions.entity";

@Entity("like")
export class Like extends BaseModel {

  @ManyToOne(() => User, user => user.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Question, question => question.likes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "question_id" })
  question: Question;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  liked_at: Date;
}