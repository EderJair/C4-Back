// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../shared/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    // Si viene una contraseña, la hasheamos
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }
    
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: number, updateData: Partial<User>): Promise<User | null> {
    // Si viene una contraseña, la hasheamos
    if (updateData.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateData.password, saltRounds);
    }
    
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Métodos específicos por rol
  async findByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }

  async findEngineers(): Promise<User[]> {
    return this.findByRole(UserRole.INGENIERO);
  }

  async findWorkers(): Promise<User[]> {
    return this.findByRole(UserRole.TRABAJADOR);
  }

  async findDrivers(): Promise<User[]> {
    return this.findByRole(UserRole.CONDUCTOR);
  }
}