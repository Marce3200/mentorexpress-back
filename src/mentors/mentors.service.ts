import { Injectable } from '@nestjs/common';
import { mentors } from '../db/schema';
import {
  Campus,
  Subject,
  Modality,
  Language,
  MentorInsert,
  MentorUpdate,
  Mentor,
} from '../db/types';
import { eq, desc, and, SQL } from 'drizzle-orm';
import { DrizzleService } from '../db/drizzle.service';

@Injectable()
export class MentorsService {
  constructor(private drizzleService: DrizzleService) {}

  async create(data: MentorInsert): Promise<Mentor> {
    const result = await this.drizzleService.db
      .insert(mentors)
      .values(data)
      .$returningId();
    const [inserted] = await this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.id, result[0].id));
    return inserted;
  }

  async findAll(): Promise<Mentor[]> {
    return this.drizzleService.db
      .select()
      .from(mentors)
      .orderBy(desc(mentors.createdAt));
  }

  async findOne(id: number): Promise<Mentor | null> {
    const result = await this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.id, id));
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<Mentor | null> {
    const result = await this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.email, email));
    return result[0] || null;
  }

  async update(id: number, data: MentorUpdate): Promise<Mentor> {
    await this.drizzleService.db
      .update(mentors)
      .set(data)
      .where(eq(mentors.id, id));
    const result = await this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.id, id));
    return result[0];
  }

  async remove(id: number): Promise<Mentor> {
    const result = await this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.id, id));
    await this.drizzleService.db.delete(mentors).where(eq(mentors.id, id));
    return result[0];
  }

  // Specific searches - Búsquedas específicas
  async findByCampus(campus: Campus): Promise<Mentor[]> {
    return this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.campus, campus));
  }

  async findBySpecialtySubject(subject: Subject): Promise<Mentor[]> {
    return this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.specialtySubject, subject));
  }

  async findByModality(modality: Modality): Promise<Mentor[]> {
    return this.drizzleService.db
      .select()
      .from(mentors)
      .where(eq(mentors.modality, modality));
  }

  // Advanced search for student-mentor matching - Búsqueda avanzada para matching estudiante-mentor
  async findMatchingMentors(filters: {
    campus?: Campus;
    subject?: Subject;
    modality?: Modality;
    language?: Language;
  }): Promise<Mentor[]> {
    const conditions: SQL[] = [];

    if (filters.campus) {
      conditions.push(eq(mentors.campus, filters.campus));
    }
    if (filters.subject) {
      conditions.push(eq(mentors.specialtySubject, filters.subject));
    }
    if (filters.modality) {
      conditions.push(eq(mentors.modality, filters.modality));
    }
    if (filters.language) {
      conditions.push(eq(mentors.language, filters.language));
    }

    const query =
      conditions.length > 0
        ? this.drizzleService.db
            .select()
            .from(mentors)
            .where(and(...conditions))
        : this.drizzleService.db.select().from(mentors);

    return query;
  }
}
