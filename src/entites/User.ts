import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  task: Task[];
}
