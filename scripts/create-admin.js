const bcrypt = require('bcrypt');
const { Client } = require('pg');

async function createAdminUser() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'C4-BD-001',
    user: 'postgres',
    password: 'Dodod.123',
  });

  try {
    await client.connect();
    console.log('📡 Conectado a la base de datos');

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Verificar si ya existe un admin
    const existingAdmin = await client.query(`
      SELECT id, email FROM users WHERE email = 'admin@test.com'
    `);

    if (existingAdmin.rows.length > 0) {
      console.log('⚠️  Usuario admin ya existe:', existingAdmin.rows[0]);
      return existingAdmin.rows[0];
    }

    // Crear usuario admin
    const result = await client.query(`
      INSERT INTO users (
        "firstName", "lastName", email, password, role, 
        "companyName", "isActive", "createdAt", "updatedAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id, email, role, "firstName", "lastName"
    `, [
      'Admin',
      'Principal',
      'admin@test.com',
      hashedPassword,
      'admin',
      'Empresa Principal',
      true
    ]);

    const admin = result.rows[0];
    console.log('✅ Usuario admin creado:', admin);
    return admin;
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

createAdminUser();
