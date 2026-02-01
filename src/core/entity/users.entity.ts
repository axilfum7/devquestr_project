import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from "src/common/database";
import { UserProgress } from "src/core/entity/user_progress.entity";
import { Review } from "src/core/entity/reviews.entity";
import { Like } from "src/core/entity/like.entity";
import { Pack } from "src/core/entity/packs.entity";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN"
}

@Entity("users")
export class User extends BaseModel {

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => UserProgress, progresses => progresses.user)
  progresses: UserProgress[];

  @OneToMany(() => Review, reviews => reviews.user)
  reviews: Review[];

  @OneToMany(() => Like, likes => likes.user)
  likes: Like[];

  @OneToMany(() => Pack, packs => packs.user)
  packs: Pack[];
}
