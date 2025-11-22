import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service.js';
import { MentorsController } from './mentors.controller.js';
import { DbModule } from '../db/db.module.js';

@Module({
  imports: [DbModule],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService],
})
export class MentorsModule {}
