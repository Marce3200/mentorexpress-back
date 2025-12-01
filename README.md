# 🎓 Sistema de Mentoría Académica

Un sistema completo de mentoría académica construido con **NestJS**, **Drizzle ORM** y **MySQL**, con documentación interactiva mediante **Swagger/OpenAPI**.

## 🚀 Características

- ✅ **API REST completa** para gestión de estudiantes y mentores
- ✅ **Drizzle ORM** con MySQL
- ✅ **Documentación Swagger** automática e interactiva
- ✅ **Integración con servicio ML (FastAPI)** para triaje académico/emocional y matching estudiante-mentor
- ✅ **Validación de datos** con DTOs tipados
- ✅ **Base de datos MySQL** con Docker
- ✅ **Drizzle Studio** para gestión visual de BD
- ✅ **Runtime ESM** moderno
- ✅ **TypeScript** completamente tipado

## 📋 Requisitos Previos

- **Node.js** 18+ con soporte ESM
- **Docker** y **Docker Compose**
- **npm** o **yarn**

## 🛠️ Instalación y Configuración

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env según sea necesario
```

Las variables más relevantes incluyen:

- `DATABASE_URL`: cadena de conexión a MySQL.
- `ML_SERVICE_URL`: URL base del servicio ML (FastAPI) usada por `MlClientService` (por defecto `http://localhost:8000` si no se define).

### 3. Levantar servicios de base de datos
```bash
docker compose up -d
```

### 4. Generar esquema Drizzle
```bash
npm run db:generate
```

### 5. Ejecutar migraciones
```bash
npm run db:migrate      # Ejecutar migraciones
```

## 🔧 Puertos Configurados

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **API NestJS** | `3000` | Aplicación principal |
| **Swagger Docs** | `3000/api` | Documentación interactiva |
| **MySQL** | `3307` | Base de datos (puerto único) |
| **Drizzle Studio** | Web | Interfaz visual BD |

## 🚀 Ejecutar la aplicación

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo producción
npm run build
npm run start:prod

# Comando completo de despliegue
npm run deploy  # Compila, migra BD y ejecuta en producción
```

## 📚 Endpoints de la API

### Estudiantes
- `GET /students` - Listar estudiantes (con filtros)
- `POST /students` - Crear estudiante
- `GET /students/:id` - Obtener estudiante por ID
- `PATCH /students/:id` - Actualizar estudiante
- `DELETE /students/:id` - Eliminar estudiante
- `POST /students/request-help` - Procesar solicitud de ayuda con triaje ML (académica vs emocional) y matching automático de mentores.
- `POST /students/:studentId/select-mentor/:mentorId` - Confirmar selección de mentor y enviar emails de notificación.

### Mentores
- `GET /mentors` - Listar mentores (con filtros)
- `POST /mentors` - Crear mentor
- `GET /mentors/match` - Buscar mentores compatibles
- `GET /mentors/:id` - Obtener mentor por ID
- `PATCH /mentors/:id` - Actualizar mentor
- `DELETE /mentors/:id` - Eliminar mentor

## 🎯 Acceder a los servicios

- **API Principal**: http://localhost:3000
- **Documentación Swagger**: http://localhost:3000/api
- **Drizzle Studio**: `npm run db:studio` (abre en navegador)

## 🗃️ Modelo de Datos

### Estudiantes
- Nombre completo, email, sede, carrera, asignatura, año, idioma, modalidad, descripción

### Mentores
- Nombre completo, email, sede, carrera, especialidad, idioma, modalidad, bio, disponibilidad

## 🧪 Ejecutar pruebas

```bash
# Tests unitarios
npm run test

# Tests con watch
npm run test:watch

# Tests de integración
npm run test:e2e

# Cobertura de tests
npm run test:cov

# Probar API completa
npm run test:api
```

## 🖥️ Comandos disponibles

```bash
# Desarrollo
npm run start:dev          # Servidor con hot-reload
npm run db:studio          # Interfaz visual de Drizzle

# Base de datos
npm run db:generate        # Generar esquema
npm run db:migrate         # Ejecutar migraciones
npm run db:seed            # Insertar datos de prueba

# Producción
npm run build              # Compilar aplicación
npm run deploy             # Build + Start PROD
```

## 🗂️ Estructura del proyecto

```
src/
├── db/                 # Configuración de base de datos
│   ├── schema.ts       # Esquemas Drizzle
│   ├── types.ts        # Tipos centralizados
│   ├── db.module.ts    # Módulo de BD
│   ├── db.service.ts   # Servicio de BD
│   ├── drizzle.service.ts
│   ├── seed.ts         # Datos de prueba
│   └── index.ts        # Exports
├── mentors/            # Módulo de mentores
│   ├── dto/           # Data Transfer Objects
│   ├── mentors.controller.ts
│   ├── mentors.service.ts
│   └── mentors.module.ts
├── students/           # Módulo de estudiantes
│   ├── dto/           # Data Transfer Objects
│   ├── students.controller.ts
│   ├── students.service.ts
│   └── students.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 🛠️ Tecnologías utilizadas

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Base de datos**: MySQL con Docker
- **Documentación**: [Swagger/OpenAPI](https://swagger.io/)
- **Runtime**: Node.js ESM
- **Lenguaje**: TypeScript
- **Contenedores**: Docker & Docker Compose

## 📖 Más información

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación Drizzle](https://orm.drizzle.team/docs/overview)
- [Swagger/OpenAPI](https://swagger.io/docs/)
