# Guía de Uso de Prisma ORM

## Configuración Inicial

### 1. Configurar la Base de Datos

Crea un archivo `.env` en la raíz del proyecto con tu cadena de conexión MySQL:

```bash
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"
```

### 2. Crear la Base de Datos

Asegúrate de que tu servidor MySQL esté corriendo y crea la base de datos:

```sql
CREATE DATABASE mentoria_db;
```

### 3. Ejecutar Migraciones

Crea las tablas en la base de datos:

```bash
npm run prisma:migrate
```

Cuando se te solicite un nombre para la migración, usa algo descriptivo como `init` o `create_estudiantes_mentores_tables`.

### 4. Generar Prisma Client

Si aún no se ha generado:

```bash
npm run prisma:generate
```

## Scripts Disponibles

- `npm run prisma:generate` - Genera el cliente de Prisma
- `npm run prisma:migrate` - Crea y aplica migraciones
- `npm run prisma:studio` - Abre Prisma Studio (interfaz visual para la BD)
- `npm run prisma:seed` - Ejecuta el archivo de seed (si existe)

## Estructura del Proyecto

```
src/
├── prisma/
│   ├── prisma.service.ts   # Servicio de Prisma con gestión de conexión
│   └── prisma.module.ts    # Módulo global de Prisma
├── estudiantes/
│   ├── estudiantes.service.ts
│   ├── estudiantes.controller.ts
│   └── estudiantes.module.ts
└── mentores/
    ├── mentores.service.ts
    ├── mentores.controller.ts
    └── mentores.module.ts
```

## Endpoints API

### Estudiantes

- `POST /estudiantes` - Crear estudiante
- `GET /estudiantes` - Listar todos los estudiantes
- `GET /estudiantes?campus=ANTONIO_VARAS` - Filtrar por campus
- `GET /estudiantes?carrera=INGENIERIA_COMPUTACION` - Filtrar por carrera
- `GET /estudiantes?asignatura=PROGRAMACION` - Filtrar por asignatura
- `GET /estudiantes/:id` - Obtener estudiante por ID
- `PATCH /estudiantes/:id` - Actualizar estudiante
- `DELETE /estudiantes/:id` - Eliminar estudiante

### Mentores

- `POST /mentores` - Crear mentor
- `GET /mentores` - Listar todos los mentores
- `GET /mentores?campus=VINA_DEL_MAR` - Filtrar por campus
- `GET /mentores?asignatura=CALCULO_I` - Filtrar por asignatura de especialidad
- `GET /mentores?modalidad=ONLINE` - Filtrar por modalidad
- `GET /mentores/match?campus=X&asignatura=Y&modalidad=Z` - Buscar mentores compatibles
- `GET /mentores/:id` - Obtener mentor por ID
- `PATCH /mentores/:id` - Actualizar mentor
- `DELETE /mentores/:id` - Eliminar mentor

## Valores de Enums

### Campus
- `ANTONIO_VARAS`
- `VINA_DEL_MAR`
- `CONCEPCION`

### Carrera
- `INGENIERIA_CIVIL`
- `INGENIERIA_COMPUTACION`
- `INGENIERIA_ELECTRICA`
- `INGENIERIA_INDUSTRIAL`

### Asignatura
- `CALCULO_I`
- `ALGEBRA_LINEAL`
- `FISICA`
- `PROGRAMACION`
- `ELECTRONICA`

### Idioma
- `ESPANOL`
- `INGLES`
- `ESPANOL_INGLES`

### Modalidad
- `PRESENCIAL`
- `ONLINE`

## Ejemplo de Uso

### Crear un Estudiante

```bash
curl -X POST http://localhost:3000/estudiantes \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "Juan Pérez",
    "email": "juan.perez@example.com",
    "campus": "ANTONIO_VARAS",
    "carrera": "INGENIERIA_COMPUTACION",
    "asignatura": "PROGRAMACION",
    "anioCursanteActual": 1,
    "idioma": "ESPANOL",
    "modalidad": "PRESENCIAL",
    "solicitud": "Necesito ayuda con programación orientada a objetos"
  }'
```

### Crear un Mentor

```bash
curl -X POST http://localhost:3000/mentores \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "María González",
    "email": "maria.gonzalez@example.com",
    "campus": "ANTONIO_VARAS",
    "carrera": "INGENIERIA_COMPUTACION",
    "asignaturaEspecialidad": "PROGRAMACION",
    "idioma": "ESPANOL_INGLES",
    "modalidad": "PRESENCIAL",
    "bio": "Desarrolladora senior con 5 años de experiencia",
    "disponibilidadHoraria": "Lunes a Viernes 18:00-20:00"
  }'
```

## Prisma Studio

Para explorar y editar datos visualmente:

```bash
npm run prisma:studio
```

Esto abrirá una interfaz web en `http://localhost:5555`

## Mejores Prácticas

1. **Nunca commitear el archivo `.env`** - Ya está en `.gitignore`
2. **Usar migraciones** - No modificar la base de datos manualmente
3. **Regenerar el cliente** - Después de cambios en el schema: `npm run prisma:generate`
4. **Type Safety** - Aprovechar los tipos generados por Prisma
5. **Transacciones** - Para operaciones múltiples relacionadas

## Recursos

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de NestJS + Prisma](https://docs.nestjs.com/recipes/prisma)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
