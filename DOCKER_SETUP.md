# Docker Compose - Local Development Setup

## Quick Start - Inicio Rápido

### 1. Start the database - Iniciar la base de datos

```bash
docker-compose up -d
```

This will start:
- MySQL 8.0 on port `3306`
- phpMyAdmin on port `8080`

### 2. Create .env file - Crear archivo .env

```bash
cp .env.example .env
```

The default connection string is already configured:
```
DATABASE_URL="mysql://mentoria_user:mentoria_password@localhost:3306/mentoria_db"
```

### 3. Run migrations - Ejecutar migraciones

```bash
npm run prisma:migrate
```

### 4. Start the application - Iniciar la aplicación

```bash
npm run start:dev
```

---

## Services - Servicios

### MySQL Database

- **Host:** localhost
- **Port:** 3306
- **Database:** mentoria_db
- **User:** mentoria_user
- **Password:** mentoria_password
- **Root Password:** root_password

### phpMyAdmin

- **URL:** http://localhost:8080
- **Server:** mysql
- **Username:** root
- **Password:** root_password

---

## Docker Commands - Comandos Docker

### Start services - Iniciar servicios
```bash
docker-compose up -d
```

### Stop services - Detener servicios
```bash
docker-compose down
```

### Stop and remove volumes - Detener y eliminar volúmenes (⚠️ deletes data)
```bash
docker-compose down -v
```

### View logs - Ver logs
```bash
docker-compose logs -f
docker-compose logs -f mysql
```

### Restart services - Reiniciar servicios
```bash
docker-compose restart
```

### Check status - Verificar estado
```bash
docker-compose ps
```

---

## Database Access - Acceso a la Base de Datos

### Using MySQL CLI - Usando MySQL CLI

```bash
docker exec -it mentoria-mysql mysql -u mentoria_user -p
# Password: mentoria_password
```

### Using root user - Usando usuario root

```bash
docker exec -it mentoria-mysql mysql -u root -p
# Password: root_password
```

### Execute SQL file - Ejecutar archivo SQL

```bash
docker exec -i mentoria-mysql mysql -u mentoria_user -pmentoria_password mentoria_db < backup.sql
```

---

## Backup & Restore - Respaldo y Restauración

### Create backup - Crear respaldo

```bash
docker exec mentoria-mysql mysqldump -u root -proot_password mentoria_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore from backup - Restaurar desde respaldo

```bash
docker exec -i mentoria-mysql mysql -u root -proot_password mentoria_db < backup.sql
```

---

## Configuration Files - Archivos de Configuración

### docker-compose.yml

Main Docker Compose configuration file with:
- MySQL 8.0 service
- phpMyAdmin service
- Volume for data persistence
- Network configuration
- Health checks

### docker/mysql/my.cnf

MySQL custom configuration:
- UTF-8 character set (utf8mb4)
- Performance tuning
- Connection limits
- Slow query logging

---

## Troubleshooting - Solución de Problemas

### Port already in use - Puerto ya en uso

If port 3306 is already in use, modify `docker-compose.yml`:

```yaml
ports:
  - "3307:3306"  # Use port 3307 instead
```

And update your `.env`:
```
DATABASE_URL="mysql://mentoria_user:mentoria_password@localhost:3307/mentoria_db"
```

### Can't connect to database - No se puede conectar a la base de datos

1. Check if containers are running:
   ```bash
   docker-compose ps
   ```

2. Check MySQL logs:
   ```bash
   docker-compose logs mysql
   ```

3. Wait for MySQL to be ready (check health):
   ```bash
   docker inspect mentoria-mysql | grep -A 10 Health
   ```

### Reset database - Reiniciar base de datos

⚠️ **Warning: This will delete all data**

```bash
docker-compose down -v
docker-compose up -d
npm run prisma:migrate
```

---

## Production Considerations - Consideraciones de Producción

> [!WARNING]
> This Docker Compose setup is for **local development only**. For production:
> 
> - Use strong passwords
> - Don't expose phpMyAdmin
> - Use environment variables from secrets
> - Configure proper backups
> - Use SSL/TLS connections
> - Implement proper security hardening

---

## Data Persistence - Persistencia de Datos

Data is persisted using a Docker named volume named `mysql_data`. This volume is managed by Docker and not mapped to a local folder on your host machine.

- ✅ Data survives container restarts
- ✅ Data survives `docker-compose down`
- ❌ Data is deleted with `docker-compose down -v`

To inspect the volume:
```bash
docker volume inspect backend-nestjs_mysql_data
```

**Note:** The data is stored in Docker's internal storage, not in a visible folder on your local machine.

---

## Network Configuration - Configuración de Red

All services are connected via the `mentoria-network` bridge network. This allows:
- Services to communicate using service names (e.g., `mysql`)
- Isolation from other Docker networks
- Easy service discovery

---

## Environment Variables - Variables de Entorno

You can customize the database configuration by modifying `docker-compose.yml`:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: your_root_password
  MYSQL_DATABASE: your_database_name
  MYSQL_USER: your_username
  MYSQL_PASSWORD: your_password
```

Remember to update your `.env` file accordingly.
