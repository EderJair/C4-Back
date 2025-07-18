const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function createAdminAndTest() {
  try {
    console.log('🔧 CREANDO ADMIN Y PROBANDO FLUJO COMPLETO');
    
    // 1. Crear admin usando auth/register
    console.log('\n👑 Creando usuario admin...');
    const adminData = {
      firstName: "Admin",
      lastName: "Principal",
      email: "admin@test.com",
      password: "admin123",
      role: 'admin',
      companyName: "Empresa Principal",
      isActive: true
    };
    
    try {
      const adminResponse = await axios.post(`${BASE_URL}/auth/register`, adminData);
      console.log('✅ Admin creado:', adminResponse.data);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('⚠️  Admin ya existe, continuando...');
      } else {
        throw error;
      }
    }
    
    // 2. Login como admin
    console.log('\n🔑 Haciendo login como admin...');
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin@test.com",
      password: "admin123"
    });
    
    const adminToken = adminLogin.data.accessToken;
    console.log('✅ Admin token obtenido');
    
    // 3. Crear ingeniero exactamente como el frontend
    console.log('\n👨‍💼 Creando ingeniero...');
    const payload = {
      firstName: "Carlos",
      lastName: "Rodríguez",
      email: "carlos.test@empresa.com", // Email único
      password: "123456",
      phone: "987654321",
      dni: "12345678",
      address: "Dirección opcional",
      companyName: "Empresa opcional",
      role: 'ingeniero',
      isActive: true,
    };
    
    const createResponse = await axios.post(`${BASE_URL}/users`, payload, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Usuario creado:', createResponse.data);
    
    // 4. Intentar login con el ingeniero
    console.log('\n🔐 Intentando login con el ingeniero...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: "carlos.test@empresa.com",
      password: "123456"
    });
    
    console.log('✅ Login exitoso:', loginResponse.data);
    console.log('🎉 ¡TODO FUNCIONA CORRECTAMENTE!');
    
  } catch (error) {
    console.error('❌ ERROR:', error.response?.data || error.message);
    if (error.response?.data?.message) {
      console.error('📝 Detalle del error:', error.response.data.message);
    }
    if (error.response?.status) {
      console.error('📊 Status code:', error.response.status);
    }
  }
}

createAdminAndTest();
