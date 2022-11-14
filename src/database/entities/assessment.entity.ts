import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity({ name: "assessments" })
export class AssessmentEntity extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  grade!: number;

  @Column()
  subject!: string;

  @Column({ name: "growdever_id" })
  growdeverId!: string;

  @ManyToOne(() => GrowdeverEntity, (e) => e.assessments)
  @JoinColumn({ name: "growdever_id", referencedColumnName: "id" })
  growdever?: GrowdeverEntity;
}
