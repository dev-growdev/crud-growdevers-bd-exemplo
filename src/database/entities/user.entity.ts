import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "" })
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "full_name" })
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
