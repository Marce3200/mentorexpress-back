import { Injectable } from '@nestjs/common';
import { students } from '../db/schema';
import {
  Campus,
  Career,
  Subject,
  StudentInsert,
  StudentUpdate,
  Student,
} from '../db/types';
import { eq, desc } from 'drizzle-orm';
import { DrizzleService } from '../db/drizzle.service';

@Injectable()
export class StudentsService {
  constructor(private drizzleService: DrizzleService) {}

  async create(data: StudentInsert): Promise<Student> {
    const result = await this.drizzleService.db
      .insert(students)
      .values(data)
      .$returningId();
    const [inserted] = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, result[0].id));
    return inserted;
  }

  async findAll(): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .orderBy(desc(students.createdAt));
  }

  async findOne(id: number): Promise<Student | null> {
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, id));
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.email, email));
    return result[0] || null;
  }

  async update(id: number, data: StudentUpdate): Promise<Student> {
    await this.drizzleService.db
      .update(students)
      .set(data)
      .where(eq(students.id, id));
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, id));
    return result[0];
  }

  async remove(id: number): Promise<Student> {
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, id));
    await this.drizzleService.db.delete(students).where(eq(students.id, id));
    return result[0];
  }

  // Specific searches - Búsquedas específicas
  async findByCampus(campus: Campus): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.campus, campus));
  }

  async findByCareer(career: Career): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.career, career));
  }

  async findBySubject(subject: Subject): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.subject, subject));
  }
}
