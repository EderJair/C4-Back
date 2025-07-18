// src/shared/entities/sector.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Ring } from './ring.entity';
import { Panel } from './panel.entity';

@Entity('sectors')
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  angle?: number; // Ángulo del sector en grados

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  width?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  height?: number;

  @Column({ nullable: true })
  position?: number; // Posición del sector en el anillo

  @Column({ default: 'active' })
  status: 'active' | 'inactive' | 'completed';

  // Relación con Ring
  @Column()
  ringId: number;

  @ManyToOne(() => Ring, ring => ring.sectors, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'ringId' })
  ring: Ring;

  // Relación con Paneles
  @OneToMany(() => Panel, panel => panel.sector, {
    cascade: true,
    eager: false
  })
  panels: Panel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
