import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "src/common/database";
import { User } from "src/core/entity/users.entity";
import { Question } from "src/core/entity/questions.entity";

@Entity("reviews")
export class Review extends BaseModel {

  @ManyToOne(() => User, u => u.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Question, q => q.reviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "question_id" })
  question: Question;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  viewed_at: Date;
}