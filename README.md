# 🎓 Sistema de Mentoría Académica

Un sistema completo de mentoría académica construido con **NestJS**, **Prisma ORM v7** y **MySQL**, con documentación interactiva mediante **Swagger/OpenAPI**.

## 🚀 Características

- ✅ **API REST completa** para gestión de estudiantes y mentores
- ✅ **Prisma ORM v7** con adaptadores MariaDB
- ✅ **Documentación Swagger** automática e interactiva
- ✅ **Validación de datos** con DTOs tipados
- ✅ **Base de datos MySQL** con Docker
- ✅ **Interfaz phpMyAdmin** para gestión de BD
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

### 3. Levantar servicios de base de datos
```bash
docker compose up -d
```

### 4. Generar cliente Prisma
```bash
npm run prisma:generate
```

### 5. Ejecutar migraciones (opcional)
```bash
npm run prisma:migrate dev
```

## 🔧 Puertos Configurados

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **API NestJS** | `3000` | Aplicación principal |
| **Swagger Docs** | `3000/api` | Documentación interactiva |
| **MySQL** | `3307` | Base de datos (puerto único) |
| **phpMyAdmin** | `8011` | Interfaz web BD (puerto único) |

## 🚀 Ejecutar la aplicación

```bash
# Modo desarrollo con hot-reload
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

## 📚 Endpoints de la API

### Estudiantes
- `GET /students` - Listar estudiantes (con filtros)
- `POST /students` - Crear estudiante
- `GET /students/:id` - Obtener estudiante por ID
- `PATCH /students/:id` - Actualizar estudiante
- `DELETE /students/:id` - Eliminar estudiante

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
- **phpMyAdmin**: http://localhost:8011
  - Usuario: `root`
  - Contraseña: `root_password`

## 🗃️ Modelo de Datos

### Estudiantes
- Nombre completo, email, sede, carrera, asignatura, año, idioma, modalidad, descripción

### Mentores
- Nombre completo, email, sede, carrera, especialidad, idiomas, modalidad, bio, disponibilidad

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

## 📁 Estructura del proyecto

```
src/
├── generated/          # Cliente Prisma generado
├── mentors/           # Módulo de mentores
│   ├── dto/          # Data Transfer Objects
│   ├── mentors.controller.ts
│   ├── mentors.service.ts
│   └── mentors.module.ts
├── prisma/            # Configuración Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── students/          # Módulo de estudiantes
│   ├── dto/          # Data Transfer Objects
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
- **ORM**: [Prisma](https://prisma.io/) v7
- **Base de datos**: MySQL con Docker
- **Documentación**: [Swagger/OpenAPI](https://swagger.io/)
- **Runtime**: Node.js ESM
- **Lenguaje**: TypeScript
- **Contenedores**: Docker & Docker Compose

## 📖 Más información

- [Documentación NestJS](https://docs.nestjs.com/)
- [Documentación Prisma](https://www.prisma.io/docs)
- [Swagger/OpenAPI](https://swagger.io/docs/)
