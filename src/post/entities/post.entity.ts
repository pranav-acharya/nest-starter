import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

//   @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  // () => syntax for default allows to use SQL expressions.
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ default: true })
  isVisible: boolean;
}