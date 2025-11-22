import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { DrizzleService } from './drizzle.service';

export const DRIZZLE = Symbol('DRIZZLE');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: async () => {
        const connection = await mysql.createConnection(
          process.env.DATABASE_URL!,
        );
        return drizzle(connection, { schema, mode: 'default' });
      },
    },
    DrizzleService,
  ],
  exports: [DRIZZLE, DrizzleService],
})
export class DbModule {}
