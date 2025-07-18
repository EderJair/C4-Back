import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProjectPhase } from './project-phase.entity';
import { Ring } from './ring.entity';

@Entity('excavation_data')
export class ExcavationData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectPhaseId: number;

  @ManyToOne(() => ProjectPhase, projectPhase => projectPhase.excavationData)
  @JoinColumn({ name: 'projectPhaseId' })
  projectPhase: ProjectPhase;

  // Datos específicos de excavación
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  excavationDepth: number; // Profundidad en metros

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  excavationArea: number; // Área en m²

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  excavationVolume: number; // Volumen en m³

  @Column({ type: 'enum', enum: ['clay', 'sand', 'rock', 'mixed'], nullable: true })
  soilType: 'clay' | 'sand' | 'rock' | 'mixed';

  @Column({ type: 'json', nullable: true })
  equipment: string[]; // Equipos utilizados

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  laborHours: number; // Horas de trabajo

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  materialCost: number; // Costo de materiales

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  equipmentCost: number; // Costo de equipos

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  laborCost: number; // Costo de mano de obra

  @Column({ type: 'text', nullable: true })
  notes: string; // Notas adicionales

  @Column({ type: 'json', nullable: true })
  photos: string[]; // URLs de fotos

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed', 'paused'], default: 'pending' })
  status: 'pending' | 'in_progress' | 'completed' | 'paused';

  // Relación con Rings
  @OneToMany(() => Ring, ring => ring.excavationData, {
    cascade: true,
    eager: false
  })
  rings: Ring[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
