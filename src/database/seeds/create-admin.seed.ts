import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../shared/entities';

export async function createAdminUser(dataSource: DataSource): Promise<void> {
  const userRepository = dataSource.getRepository(User);
  
  // Verificar si ya existe un usuario admin
  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@construccion.com' }
  });
  
  if (existingAdmin) {
    console.log('✅ Usuario admin ya existe en la base de datos');
    return;
  }
  
  // Crear el usuario admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = userRepository.create({
    firstName: 'Admin',
    lastName: 'Sistema',
    email: 'admin@construccion.com',
    password: hashedPassword,
    role: UserRole.ADMIN,
    phone: '+57 300 000 0000',
    dni: '00000000',
    address: 'Dirección Admin',
    companyName: 'C4 Construction',
    isActive: true,
  });
  
  await userRepository.save(adminUser);
  console.log('✅ Usuario admin creado exitosamente');
  console.log('📧 Email: admin@construccion.com');
  console.log('🔑 Password: admin123');
}
