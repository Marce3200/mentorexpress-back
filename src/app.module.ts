import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DbModule } from './db/db.module.js';
import { StudentsModule } from './students/students.module.js';
import { MentorsModule } from './mentors/mentors.module.js';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, StudentsModule, MentorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
