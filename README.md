# C4 Construction Management API

Sistema de gestión de proyectos de construcción desarrollado con NestJS y PostgreSQL.

## 🏗️ Arquitectura del Proyecto

```
src/
├── app.module.ts              # Módulo principal de la aplicación
├── main.ts                    # Punto de entrada de la aplicación
├── common/                    # Utilidades compartidas
│   ├── decorators/           # Decoradores personalizados
│   ├── guards/               # Guards de autenticación/autorización
│   ├── interceptors/         # Interceptores para transformar respuestas
│   ├── pipes/                # Pipes de validación
│   └── filters/              # Filtros de excepción
├── config/                   # Configuración de la aplicación
│   ├── database.config.ts    # Configuración de base de datos
│   ├── app.config.ts         # Configuración general
│   └── validation.schema.ts  # Esquema de validación de variables de entorno
├── shared/                   # Recursos compartidos
│   ├── entities/             # Entidades de TypeORM
│   │   ├── user.entity.ts
│   │   ├── project.entity.ts
│   │   ├── project-phase.entity.ts
│   │   └── excavation-data.entity.ts
│   └── interfaces/           # Interfaces compartidas
├── modules/                  # Módulos de negocio
│   ├── users/               # Gestión de usuarios
│   ├── projects/            # Gestión de proyectos
│   ├── project-phases/      # Gestión de fases de proyecto
│   └── excavation/          # Datos específicos de excavación
└── database/                # Base de datos
    ├── migrations/          # Migraciones
    └── seeds/              # Datos de prueba
```

## 🚀 Características

- **Gestión de Usuarios**: CRUD completo con roles (Admin, Ingeniero, Trabajador, Conductor)
- **Gestión de Proyectos**: Control completo de proyectos de construcción
- **Fases de Proyecto**: Manejo de diferentes tipos de fases (Excavación, Demolición, Construcción, Acabados)
- **Datos de Excavación**: Registro detallado de métricas y costos de excavación
- **Validación Global**: Validación automática de datos de entrada
- **Manejo de Errores**: Respuestas de error consistentes
- **Configuración Centralizada**: Variables de entorno validadas

## 📋 Prerrequisitos

- Node.js >= 18
- PostgreSQL >= 12
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone <repository-url>
cd c4-app-backend-001
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
```

4. Editar el archivo `.env` con tus configuraciones:
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=c4_construction
```

5. Ejecutar en modo desarrollo
```bash
npm run start:dev
```
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
"# C4-Back" 
