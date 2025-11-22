import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service.js';
import { MentorsController } from './mentors.controller.js';

@Module({
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService],
})
export class MentorsModule {}
