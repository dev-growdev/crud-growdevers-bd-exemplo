import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { AddressEntity } from "./address.entity";
import { AssessmentEntity } from "./assessment.entity";

@Entity({ name: "growdevers" })
export class GrowdeverEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  birth!: Date;

  @Column()
  cpf!: string;

  @Column()
  status!: string;

  @Column()
  skills!: string;

  @Column({ name: "address_id", nullable: true })
  addressId!: string | null;

  @OneToOne(() => AddressEntity) //{ eager: true }
  @JoinColumn({ name: "address_id", referencedColumnName: "id" })
  address?: AddressEntity;

  @OneToMany(() => AssessmentEntity, (e) => e.growdever) //{ eager: true }
  assessments?: AssessmentEntity[];
}
