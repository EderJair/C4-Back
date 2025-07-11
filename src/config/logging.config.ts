import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Configuración de logging para TypeORM
export const typeormLoggingConfig = {
  // Opción 1: Sin logging (recomendado para desarrollo limpio)
  clean: {
    logging: false,
    logger: 'file' as const,
  },

  // Opción 2: Solo errores
  errorsOnly: {
    logging: ['error'] as const,
    logger: 'advanced-console' as const,
  },

  // Opción 3: Solo queries lentas (útil para optimización)
  slowQueries: {
    logging: ['query', 'error'] as const,
    logger: 'advanced-console' as const,
    maxQueryExecutionTime: 1000, // Solo queries que tarden más de 1 segundo
  },

  // Opción 4: Todo (solo para debug intenso)
  debug: {
    logging: 'all' as const,
    logger: 'advanced-console' as const,
  },
};
