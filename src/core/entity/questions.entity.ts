import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseModel } from "src/common/database";
import { Direction } from "src/core/entity/direction.entity";
import { Level } from "src/core/entity/level.entity";
import { UserProgress } from "src/core/entity/user_progress.entity";
import { Review } from "src/core/entity/reviews.entity";
import { Like } from "src/core/entity/like.entity";
import { PackSave } from "src/core/entity/pack_save.entity";

@Entity("questions")
export class Question extends BaseModel {

  @ManyToOne(() => Direction, d => d.questions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "direction_id" })
  direction: Direction;

  @ManyToOne(() => Level, level => level.questions, { onDelete: "SET NULL" })
  @JoinColumn({ name: "level_id" })
  level: Level;

  @Column("text")
  title: string;

  @Column()
  answer: string;

  @OneToMany(() => UserProgress, p => p.question)
  progresses: UserProgress[];

  @OneToMany(() => Review, r => r.question)
  reviews: Review[];

  @OneToMany(() => Like, l => l.question)
  likes: Like[];

  @OneToMany(() => PackSave, ps => ps.question)
  packSaves: PackSave[];
}
