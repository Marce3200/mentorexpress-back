import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: env("DATABASE_URL"),
        shadowDatabaseUrl: "mysql://root:root_password@localhost:3307/mentoria_db", // Usar root para shadow DB
    },
});
