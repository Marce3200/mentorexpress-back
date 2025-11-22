import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsController } from './mentors.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [MentorsController],
  providers: [MentorsService],
  exports: [MentorsService],
})
export class MentorsModule {}
