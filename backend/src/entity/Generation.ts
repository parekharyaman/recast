import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Template } from "./Template.js";

@Entity("generations")
export class Generation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column()
  userId: string;

  @ManyToOne(() => Template, { nullable: true })
  @JoinColumn({ name: "templateId" })
  template: Template | null;

  @Column({ type: "uuid", nullable: true })
  templateId: string | null;

  @Column()
  openaiJobId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
