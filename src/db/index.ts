import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from './schema.js';

export type DrizzleDB = MySql2Database<typeof schema>;
