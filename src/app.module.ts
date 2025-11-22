import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { StudentsModule } from './students/students.module';
import { MentorsModule } from './mentors/mentors.module';

@Module({
  imports: [ConfigModule.forRoot(), DbModule, StudentsModule, MentorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
