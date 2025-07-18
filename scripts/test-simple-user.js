// Script simple para probar creación de usuario sin autenticación
const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testSimpleUser() {
  try {
    console.log('🧪 CREANDO USUARIO DE PRUEBA VIA AUTH/REGISTER');
    
    // Usar endpoint de registro que no requiere autenticación
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      firstName: 'Test',
      lastName: 'Engineer',
      email: 'test.engineer@example.com',
      password: 'password123',
      role: 'INGENIERO',
      phone: '123456789',
      dni: '87654321',
      address: 'Test Address',
      companyName: 'Test Company'
    });
    
    console.log('✅ Usuario registrado:', registerResponse.data);
    
    // Intentar login inmediatamente
    console.log('\n🔐 Intentando login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test.engineer@example.com',
      password: 'password123'
    });
    
    console.log('✅ Login exitoso:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    console.error('❌ STATUS:', error.response?.status);
  }
}

testSimpleUser();
