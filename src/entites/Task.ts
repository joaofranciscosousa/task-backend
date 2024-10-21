import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity("Task")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  estimateAt: Date;

  @Column()
  doneAt: Date;

  @ManyToOne(() => User, (user) => user.task)
  user: User | number;
}
