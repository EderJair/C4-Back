// src/shared/entities/panel.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Sector } from './sector.entity';

@Entity('panels')
export class Panel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  width?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  height?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  thickness?: number;

  @Column({ nullable: true })
  position?: number; // Posición del panel en el sector

  @Column({ default: 'active' })
  status: 'active' | 'inactive' | 'completed';

  @Column({ length: 100, nullable: true })
  material?: string; // Material del panel

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  weight?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cost?: number;

  // Relación con Sector
  @Column()
  sectorId: number;

  @ManyToOne(() => Sector, sector => sector.panels, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'sectorId' })
  sector: Sector;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
