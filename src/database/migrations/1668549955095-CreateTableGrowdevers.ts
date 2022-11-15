import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableGrowdevers1668549955095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "growdevers",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, isNullable: false },
          { name: "name", type: "varchar", length: "100", isNullable: false },
          {
            name: "birth",
            type: "date",
            isNullable: false,
          },
          {
            name: "cpf",
            type: "varchar",
            length: "11",
            isNullable: false,
            isUnique: true,
          },
          { name: "status", type: "varchar", length: "30", isNullable: false },
          { name: "skills", type: "text", isNullable: true },
          { name: "address_id", type: "uuid", isNullable: true },
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
            name: "fk_growdevers_addresses",
            columnNames: ["address_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "addresses",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("growdevers", true, true, true);
  }
}
