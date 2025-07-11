# 🔐 Sistema de Autenticación JWT - Guía Completa

## 📋 Resumen

Este sistema implementa autenticación JWT completa con los siguientes componentes:

- **Login con JWT**: Autenticación segura con access token y refresh token
- **Registro restringido**: Solo usuarios con rol ADMIN pueden crear nuevos usuarios
- **Protección de rutas**: Guards de autenticación y autorización por roles
- **Gestión de sesiones**: Obtener perfil, renovar tokens y cerrar sesión

## 🚀 Inicio Rápido

### 1. Iniciar la aplicación
```bash
npm run start:dev
```

### 2. Usar las credenciales del administrador
```
Email: admin@construccion.com
Password: admin123
```

## 📝 Endpoints de Autenticación

### 🔑 Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@construccion.com",
  "password": "admin123"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "firstName": "Admin",
      "lastName": "Sistema",
      "email": "admin@construccion.com",
      "role": "admin",
      "phone": "+57 300 000 0000",
      "dni": "00000000",
      "address": "Dirección Admin",
      "companyName": "C4 Construction"
    }
  }
}
```

### 👤 Crear Usuario (Solo ADMIN)
```http
POST /api/auth/register
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN

{
  "firstName": "Juan Carlos",
  "lastName": "Pérez Rodríguez",
  "email": "jperez@construccion.com",
  "password": "ingeniero123",
  "role": "ingeniero",
  "phone": "+57 300 123 4567",
  "dni": "12345678",
  "address": "Calle 123 #45-67, Bogotá"
}
```

### 👤 Obtener Perfil
```http
GET /api/auth/profile
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 🔄 Renovar Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN"
}
```

### 🚪 Cerrar Sesión
```http
POST /api/auth/logout
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 🛡️ Protección por Roles

### Roles disponibles:
- **ADMIN**: Acceso completo, puede crear usuarios
- **INGENIERO**: Puede gestionar proyectos y fases
- **TRABAJADOR**: Acceso limitado a consultas

### Endpoints protegidos:
- `POST /api/auth/register` - Solo ADMIN
- `POST /api/users` - Solo ADMIN
- `PUT /api/users/:id` - Solo ADMIN
- `DELETE /api/users/:id` - Solo ADMIN

## 📖 Cómo usar el sistema

### Paso 1: Hacer Login
1. Usa el endpoint `POST /api/auth/login` con las credenciales del admin
2. Guarda el `accessToken` y `refreshToken` de la respuesta

### Paso 2: Crear un Usuario (Solo Admin)
1. Usa el endpoint `POST /api/auth/register`
2. Incluye el header `Authorization: Bearer YOUR_ACCESS_TOKEN`
3. Envía los datos del nuevo usuario

### Paso 3: Usar endpoints protegidos
1. Incluye el header `Authorization: Bearer YOUR_ACCESS_TOKEN` en todas las peticiones
2. Si el token expira, usa el endpoint `POST /api/auth/refresh` para renovarlo

## 🔧 Configuración

### Variables de entorno requeridas:
```env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

### Configuración de base de datos:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_DATABASE=c4_construction
```

## 📚 Estructura del Sistema

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts    # Endpoints de autenticación
│   │   ├── auth.service.ts       # Lógica de autenticación
│   │   ├── auth.module.ts        # Configuración del módulo
│   │   ├── dto/
│   │   │   ├── login.dto.ts      # DTO para login
│   │   │   └── create-user.dto.ts # DTO para crear usuario
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts  # Guard de autenticación
│   │   │   └── roles.guard.ts     # Guard de roles
│   │   └── strategies/
│   │       └── jwt.strategy.ts    # Estrategia JWT
│   └── users/
│       └── users.controller.ts    # Endpoints protegidos
├── common/
│   ├── decorators/
│   │   ├── roles.decorator.ts     # Decorador de roles
│   │   └── get-user.decorator.ts  # Decorador para obtener usuario
│   └── guards/                    # Guards globales
└── shared/
    └── entities/
        └── user.entity.ts         # Entidad de usuario
```

## 🧪 Ejemplos de Pruebas

### Ejemplo 1: Login y crear usuario
```bash
# 1. Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@construccion.com", "password": "admin123"}'

# 2. Crear usuario (usar el token del paso 1)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"firstName": "Juan", "lastName": "Pérez", "email": "jperez@construccion.com", "password": "ingeniero123", "role": "ingeniero"}'
```

### Ejemplo 2: Obtener perfil
```bash
curl -X GET http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## ⚠️ Consideraciones de Seguridad

1. **Cambiar JWT_SECRET**: Usar una clave secreta fuerte en producción
2. **HTTPS**: Siempre usar HTTPS en producción
3. **Tokens cortos**: Access tokens con vida útil corta (1 hora)
4. **Refresh tokens**: Refresh tokens con vida útil más larga (7 días)
5. **Validación**: Validación estricta de entrada de datos

## 🔍 Debugging

### Verificar que la aplicación está ejecutándose:
```bash
curl http://localhost:3001/api
```

### Verificar logs de la aplicación:
Los logs aparecerán en la consola donde ejecutaste `npm run start:dev`

### Problemas comunes:
1. **Token expirado**: Usar refresh token para renovar
2. **Permisos insuficientes**: Verificar que el usuario tenga el rol correcto
3. **Base de datos**: Verificar que la conexión a PostgreSQL funcione

## 🎯 Próximos Pasos

1. **Documentación Swagger**: Agregar documentación automática
2. **Tests**: Implementar tests unitarios y de integración
3. **Rate Limiting**: Agregar límites de peticiones
4. **Auditoria**: Registrar acciones de usuarios
5. **Recuperación de contraseña**: Implementar reset de password

---

¡El sistema JWT está completamente configurado y listo para usar! 🚀
