import { DataSource } from 'typeorm';
import { User, Project, ProjectPhase, ExcavationData } from '../shared/entities';
import { createAdminUser } from './seeds/create-admin.seed';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'c4_construction',
    entities: [User, Project, ProjectPhase, ExcavationData],
    synchronize: true,
    logging: false,
  });
  
  try {
    console.log('🔍 Intentando conectar a la base de datos...');
    console.log(`📍 Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`📍 Port: ${process.env.DB_PORT || '5432'}`);
    console.log(`📍 Database: ${process.env.DB_DATABASE || 'c4_construction'}`);
    console.log(`📍 Username: ${process.env.DB_USERNAME || 'postgres'}`);
    
    await dataSource.initialize();
    console.log('🔗 Conectado a la base de datos exitosamente');
    
    // Crear usuario admin
    await createAdminUser(dataSource);
    
    console.log('✅ Seeds ejecutados exitosamente');
  } catch (error) {
    console.error('❌ Error ejecutando seeds:', error.message);
    console.error('📝 Detalles del error:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

runSeeds();
