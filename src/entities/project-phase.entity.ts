// src/entities/project-phase.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

export enum PhaseType {
  EXCAVACION = 'excavacion',
  DEMOLICION = 'demolicion',
  CONSTRUCCION = 'construccion',
  ACABADOS = 'acabados'
}

export enum PhaseStatus {
  PENDIENTE = 'pendiente',
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado',
  PAUSADO = 'pausado'
}

@Entity('project_phases')
export class ProjectPhase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PhaseType
  })
  type: PhaseType;

  @Column({ length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: PhaseStatus,
    default: PhaseStatus.PENDIENTE
  })
  status: PhaseStatus;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  estimatedEndDate: Date;

  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualCost: number;

  @Column({ type: 'int', default: 0 })
  progressPercentage: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Lista de equipos/materiales necesarios
  @Column({ type: 'text', nullable: true })
  requiredEquipment: string;

  @Column({ type: 'text', nullable: true })
  requiredMaterials: string;

  // Relación con Project
  @ManyToOne(() => Project, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}