import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAssessments1668549962551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "assessments",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, isNullable: false },
          {
            name: "grade",
            type: "numeric",
            precision: 4,
            scale: 2,
            isNullable: false,
          },
          {
            name: "subject",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          { name: "growdever_id", type: "uuid", isNullable: false },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "current_timestamp",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
            default: "current_timestamp",
          },
        ],
        foreignKeys: [
          {
            name: "fk_assessments_growdevers",
            columnNames: ["growdever_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "growdevers",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("assessments", true, true, true);
  }
}
