import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { StudentsModule } from './students/students.module.js';
import { MentorsModule } from './mentors/mentors.module.js';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, StudentsModule, MentorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
