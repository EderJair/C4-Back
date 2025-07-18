const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testActualFlow() {
  try {
    console.log('🎯 PROBANDO FLUJO REAL DEL PROBLEMA');
    
    // 1. Login como admin
    console.log('\n🔑 Login como admin...');
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin@test.com",
      password: "admin123"
    });
    
    const adminToken = adminLogin.data.data.accessToken;
    console.log('✅ Token obtenido:', adminToken.substring(0, 20) + '...');
    
    // 2. Crear ingeniero EXACTAMENTE como el frontend
    console.log('\n👨‍💼 Creando ingeniero (simulando frontend)...');
    const payload = {
      firstName: "Carlos",
      lastName: "Rodríguez",
      email: "carlos.real@empresa.com",
      password: "123456",
      phone: "9876543210", // 10 dígitos
      dni: "12345678",
      address: "Dirección opcional",
      companyName: "Empresa opcional",
      role: 'ingeniero', // Minúscula como en frontend
      isActive: true,
    };
    
    const createResponse = await axios.post(`${BASE_URL}/users`, payload, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Ingeniero creado:', createResponse.data);
    
    // 3. Intentar login con el ingeniero
    console.log('\n🔐 Login con ingeniero...');
    const engineerLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: "carlos.real@empresa.com",
      password: "123456"
    });
    
    console.log('✅ Login exitoso:', engineerLogin.data);
    console.log('🎉 ¡EL FLUJO FUNCIONA CORRECTAMENTE!');
    
  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    
    if (error.response?.data?.message) {
      console.error('📝 Mensaje:', error.response.data.message);
    }
    
    if (error.response?.data?.errors) {
      console.error('🔍 Errores:', error.response.data.errors);
    }
    
    console.error('📊 Status:', error.response?.status);
    console.error('🛠️  URL:', error.config?.url);
    console.error('📦 Data enviada:', error.config?.data);
  }
}

testActualFlow();
