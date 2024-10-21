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

  // @BeforeInsert()
  // setPassword() {
  //   console.log("****************");
  //   const salt = bcrypt.genSaltSync(10);
  //   const hash = bcrypt.hashSync(this.password, salt);
  //   this.password = "hash";
  // }
}
