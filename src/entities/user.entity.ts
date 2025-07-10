// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  INGENIERO = 'ingeniero',
  TRABAJADOR = 'trabajador',
  CONDUCTOR = 'conductor'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TRABAJADOR
  })
  role: UserRole;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  dni: string;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ default: true })
  isActive: boolean;

  // Para el caso de ADMIN - nombre de la empresa
  @Column({ nullable: true })
  companyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}