import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseModel } from "src/common/database";
import { Pack } from "src/core/entity/packs.entity";
import { Question } from "src/core/entity/questions.entity";

@Entity("pack_save")
export class PackSave extends BaseModel {

  @ManyToOne(() => Pack, p => p.saves, { onDelete: "CASCADE" })
  @JoinColumn({ name: "pack_id" })
  pack: Pack;

  @ManyToOne(() => Question, q => q.packSaves, { onDelete: "CASCADE" })
  @JoinColumn({ name: "question_id" })
  question: Question;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  added_at: Date;
}