// src/entities/project.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { OneToMany } from 'typeorm';
import { ProjectPhase } from './project-phase.entity';

export enum ProjectStatus {
  PLANIFICADO = 'planificado',
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado',
  CANCELADO = 'cancelado',
  PAUSADO = 'pausado'
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @OneToMany(() => ProjectPhase, (phase) => phase.project)
  phases: ProjectPhase[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 300 })
  address: string;

  @Column({ length: 150 })
  clientName: string;

  @Column({ nullable: true })
  clientPhone: string;

  @Column({ nullable: true })
  clientEmail: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANIFICADO
  })
  status: ProjectStatus;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  estimatedEndDate: Date;

  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalBudget: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  actualCost: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Relación con User (ingeniero asignado)
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedEngineerId' })
  assignedEngineer: User;

  @Column({ nullable: true })
  assignedEngineerId: number;

  // Relación con User (admin que creó el proyecto)
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  createdById: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}