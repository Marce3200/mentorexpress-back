import { Injectable, Inject } from '@nestjs/common';
import type { DrizzleDB } from './index.js';
import { DRIZZLE } from './constants.js';

@Injectable()
export class DrizzleService {
  constructor(@Inject(DRIZZLE) public db: DrizzleDB) {}
}
