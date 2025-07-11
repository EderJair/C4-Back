const https = require('https');
const http = require('http');

// Configuración del debug
const DEBUG_CONFIG = {
  baseUrl: 'http://localhost:3001',
  credentials: {
    email: 'admin@construccion.com',
    password: 'admin123'
  }
};

console.log('🔐 DEBUG LOGIN - Iniciando pruebas...\n');

// Función para hacer peticiones HTTP
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const lib = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = lib.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        error: error.message,
        code: error.code
      });
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

// Función principal de debug
async function debugLogin() {
  console.log('📍 PASO 1: Verificando que el servidor esté funcionando...');
  
  try {
    // Verificar que el servidor esté activo
    const healthCheck = await makeRequest(`${DEBUG_CONFIG.baseUrl}/api`);
    console.log('✅ Servidor activo:', healthCheck.status);
    console.log('📝 Respuesta:', healthCheck.data);
  } catch (error) {
    console.log('❌ Error conectando al servidor:', error);
    console.log('🔧 Verifica que el servidor esté corriendo en puerto 3001');
    return;
  }

  console.log('\n📍 PASO 2: Probando endpoint de login...');
  
  try {
    // Hacer login
    const loginResponse = await makeRequest(`${DEBUG_CONFIG.baseUrl}/api/auth/login`, {
      method: 'POST',
      body: DEBUG_CONFIG.credentials
    });

    console.log('🔐 Status del login:', loginResponse.status);
    console.log('📝 Headers:', loginResponse.headers);
    console.log('📝 Respuesta completa:', JSON.stringify(loginResponse.data, null, 2));

    if (loginResponse.status === 200 || loginResponse.status === 201) {
      console.log('✅ LOGIN EXITOSO!');
      
      // Verificar que tenga los tokens
      if (loginResponse.data.data && loginResponse.data.data.accessToken) {
        console.log('🔑 Access Token recibido:', loginResponse.data.data.accessToken.substring(0, 50) + '...');
        console.log('🔄 Refresh Token recibido:', loginResponse.data.data.refreshToken ? 'Sí' : 'No');
        
        // Verificar datos del usuario
        const user = loginResponse.data.data.user;
        console.log('👤 Usuario:', {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName
        });

        // Probar endpoint protegido
        console.log('\n📍 PASO 3: Probando endpoint protegido...');
        const profileResponse = await makeRequest(`${DEBUG_CONFIG.baseUrl}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.data.accessToken}`
          }
        });

        console.log('👤 Status del perfil:', profileResponse.status);
        console.log('📝 Datos del perfil:', JSON.stringify(profileResponse.data, null, 2));

      } else {
        console.log('❌ ERROR: No se recibió el token de acceso');
      }
    } else {
      console.log('❌ LOGIN FALLIDO');
      console.log('📝 Error:', loginResponse.data);
    }

  } catch (error) {
    console.log('❌ Error en el login:', error);
  }

  console.log('\n📍 PASO 4: Probando credenciales incorrectas...');
  
  try {
    const badLoginResponse = await makeRequest(`${DEBUG_CONFIG.baseUrl}/api/auth/login`, {
      method: 'POST',
      body: {
        email: 'wrong@email.com',
        password: 'wrongpassword'
      }
    });

    console.log('🔐 Status con credenciales incorrectas:', badLoginResponse.status);
    console.log('📝 Respuesta:', badLoginResponse.data);
  } catch (error) {
    console.log('❌ Error probando credenciales incorrectas:', error);
  }

  console.log('\n🎯 RESUMEN DEL DEBUG:');
  console.log('- Backend URL:', DEBUG_CONFIG.baseUrl);
  console.log('- Credenciales probadas:', DEBUG_CONFIG.credentials.email);
  console.log('- Puedes usar estos datos para debuggear tu frontend');
  console.log('\n🔧 Si hay problemas, revisa:');
  console.log('1. Que el servidor esté corriendo en puerto 3001');
  console.log('2. Que las credenciales sean correctas');
  console.log('3. Que el frontend haga la petición al URL correcto');
  console.log('4. Que el token se guarde correctamente en localStorage');
}

// Ejecutar el debug
debugLogin().catch(console.error);
