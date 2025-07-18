const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

// Simular exactamente lo que hace el frontend
async function testFrontendFlow() {
  try {
    console.log('🧪 SIMULANDO FLUJO COMPLETO DEL FRONTEND');
    
    // 1. Primero necesitamos un token de admin para crear usuarios
    console.log('\n🔑 Necesitamos hacer login como admin primero...');
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@example.com', // Cambia por un admin real
      password: 'admin123'
    });
    
    const adminToken = adminLogin.data.accessToken;
    console.log('✅ Admin token obtenido');
    
    // 2. Crear ingeniero exactamente como el frontend
    console.log('\n👨‍💼 Creando ingeniero con datos del frontend...');
    const payload = {
      firstName: "Carlos",
      lastName: "Rodríguez", 
      email: "carlos@empresa.com",
      password: "123456",
      phone: "987654321",
      dni: "12345678",
      address: "Dirección opcional",
      companyName: "Empresa opcional",
      role: 'ingeniero', // Exactamente como el frontend
      isActive: true,
    };
    
    const createResponse = await axios.post(`${BASE_URL}/users`, payload, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Usuario creado:', createResponse.data);
    
    // 3. Intentar login con el ingeniero recién creado
    console.log('\n🔐 Intentando login con el ingeniero...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: "carlos@empresa.com",
      password: "123456"
    });
    
    console.log('✅ Login exitoso:', loginResponse.data);
    
  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    if (error.response?.data?.message) {
      console.error('📝 Detalle del error:', error.response.data.message);
    }
  }
}

testFrontendFlow();
