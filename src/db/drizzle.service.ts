import { Injectable, Inject } from '@nestjs/common';
import type { DrizzleDB } from './index';
import { DRIZZLE } from './db.module';

@Injectable()
export class DrizzleService {
  constructor(@Inject(DRIZZLE) public db: DrizzleDB) {}
}
