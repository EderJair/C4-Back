// Script de prueba para crear usuario y hacer login
const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testUserCreationAndLogin() {
  try {
    console.log('🧪 INICIANDO PRUEBA DE CREACIÓN Y LOGIN');
    
    // 1. Crear usuario ingeniero
    console.log('\n📝 Creando usuario ingeniero...');
    const createUserResponse = await axios.post(`${BASE_URL}/users`, {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@test.com',
      password: '123456',
      role: 'INGENIERO',
      phone: '987654321',
      dni: '12345678',
      address: 'Av. Test 123',
      companyName: 'Test Company',
      isActive: true
    }, {
      headers: {
        'Authorization': 'Bearer YOUR_ADMIN_TOKEN', // Necesitas token de admin
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Usuario creado:', createUserResponse.data);
    
    // 2. Intentar hacer login
    console.log('\n🔐 Intentando hacer login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'juan.perez@test.com',
      password: '123456'
    });
    
    console.log('✅ Login exitoso:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
  }
}

// Ejecutar prueba
testUserCreationAndLogin();
