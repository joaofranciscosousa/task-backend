import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableTask1726426744054 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE Task (
        id int NOT NULL AUTO_INCREMENT,
        description TEXT NOT NULL,
        estimateAt DATETIME NOT NULL,
        doneAt DATETIME,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES User(id),
        PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE Task;`);
  }
}
