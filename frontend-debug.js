// 🔧 FRONTEND DEBUG SCRIPT
// Copia este código en la consola del navegador para debuggear

console.log('🔐 FRONTEND DEBUG - Iniciando...');

// Función para hacer login y debuggear el proceso
async function debugFrontendLogin() {
  console.log('📍 PASO 1: Verificando variables del entorno...');
  
  // Verificar URLs
  console.log('🌐 URL del backend:', window.location.origin);
  console.log('🌐 URL esperada:', 'http://localhost:3001');
  
  console.log('\n📍 PASO 2: Probando fetch directo...');
  
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@construccion.com',
        password: 'admin123'
      })
    });

    console.log('🔐 Status:', response.status);
    console.log('📝 Headers:', response.headers);
    
    const data = await response.json();
    console.log('📝 Respuesta:', data);

    if (data.success) {
      console.log('✅ Login exitoso desde frontend!');
      
      // Probar localStorage
      console.log('\n📍 PASO 3: Probando localStorage...');
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      console.log('💾 Token guardado:', localStorage.getItem('accessToken'));
      console.log('💾 Usuario guardado:', localStorage.getItem('user'));
      
      // Probar endpoint protegido
      console.log('\n📍 PASO 4: Probando endpoint protegido...');
      const profileResponse = await fetch('http://localhost:3001/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${data.data.accessToken}`
        }
      });
      
      const profileData = await profileResponse.json();
      console.log('👤 Perfil:', profileData);
      
      return data.data.user;
    } else {
      console.log('❌ Login fallido:', data);
    }
  } catch (error) {
    console.log('❌ Error en fetch:', error);
  }
}

// Función para verificar el estado actual
function checkCurrentState() {
  console.log('\n📍 VERIFICANDO ESTADO ACTUAL:');
  console.log('💾 Token en localStorage:', localStorage.getItem('accessToken'));
  console.log('💾 Usuario en localStorage:', localStorage.getItem('user'));
  console.log('🌐 URL actual:', window.location.href);
  console.log('📱 User agent:', navigator.userAgent);
}

// Función para limpiar estado
function clearState() {
  console.log('\n🧹 LIMPIANDO ESTADO...');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  console.log('✅ Estado limpiado');
}

// Ejecutar debug
console.log('🎯 COMANDOS DISPONIBLES:');
console.log('- debugFrontendLogin(): Probar login completo');
console.log('- checkCurrentState(): Verificar estado actual');
console.log('- clearState(): Limpiar localStorage');
console.log('\n🚀 Ejecuta: debugFrontendLogin()');

// Auto-ejecutar para ver el estado
checkCurrentState();
