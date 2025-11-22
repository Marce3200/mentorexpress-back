import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { MentorsModule } from './mentors/mentors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    StudentsModule,
    MentorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
