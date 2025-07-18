// Script temporal para hashear contraseñas existentes
const bcrypt = require('bcrypt');
const { Client } = require('pg');

async function hashExistingPasswords() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'c4_app_db',
    user: 'postgres',
    password: 'admin123', // Cambiar por tu contraseña de PostgreSQL
  });

  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    // Obtener usuarios con contraseñas sin hashear
    const result = await client.query(`
      SELECT id, email, password 
      FROM users 
      WHERE password NOT LIKE '$2b$%' 
      AND password IS NOT NULL
    `);

    console.log(`Encontrados ${result.rows.length} usuarios con contraseñas sin hashear`);

    // Hashear cada contraseña
    for (const user of result.rows) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      
      await client.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [hashedPassword, user.id]
      );
      
      console.log(`✅ Contraseña actualizada para usuario: ${user.email}`);
    }

    console.log('¡Todas las contraseñas han sido hasheadas correctamente!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

hashExistingPasswords();
