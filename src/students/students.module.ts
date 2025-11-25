import { Module } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import { StudentsController } from './students.controller.js';
import { DbModule } from '../db/db.module.js';
import { MlModule } from '../ml/ml.module.js';
import { MentorsModule } from '../mentors/mentors.module.js';
import { EmailModule } from '../email/email.module.js';

@Module({
  imports: [DbModule, MlModule, MentorsModule, EmailModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
