// src/shared/entities/ring.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ExcavationData } from './excavation-data.entity';
import { Sector } from './sector.entity';

@Entity('rings')
export class Ring {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description?: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  diameter?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  depth?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  height?: number;

  @Column({ nullable: true })
  position?: number; // Posición del anillo en la excavación

  @Column({ default: 'active' })
  status: 'active' | 'inactive' | 'completed';

  // Relación con ExcavationData
  @Column()
  excavationDataId: number;

  @ManyToOne(() => ExcavationData, excavationData => excavationData.rings, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'excavationDataId' })
  excavationData: ExcavationData;

  // Relación con Sectores
  @OneToMany(() => Sector, sector => sector.ring, {
    cascade: true,
    eager: false
  })
  sectors: Sector[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
