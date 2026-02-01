import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "src/common/database";
import { User } from "src/core/entity/users.entity";
import { Question } from "src/core/entity/questions.entity";

@Entity("user_progress")
export class UserProgress extends BaseModel {

  @ManyToOne(() => User, user => user.progresses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Question, question => question.progresses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "question_id" })
  question: Question;

  @Column({ default: false })
  learned: boolean;

  @Column({ type: "timestamp", nullable: true })
  learned_at: Date;
}