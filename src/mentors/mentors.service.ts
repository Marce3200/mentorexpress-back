import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Mentor, Prisma } from '@prisma/client';

@Injectable()
export class MentorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.MentorCreateInput): Promise<Mentor> {
    return this.prisma.mentor.create({ data });
  }

  async findAll(): Promise<Mentor[]> {
    return this.prisma.mentor.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Mentor | null> {
    return this.prisma.mentor.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Mentor | null> {
    return this.prisma.mentor.findUnique({
      where: { email },
    });
  }

  async update(id: number, data: Prisma.MentorUpdateInput): Promise<Mentor> {
    return this.prisma.mentor.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Mentor> {
    return this.prisma.mentor.delete({
      where: { id },
    });
  }

  // Specific searches - Búsquedas específicas
  async findByCampus(campus: string): Promise<Mentor[]> {
    return this.prisma.mentor.findMany({
      where: { campus: campus as any },
    });
  }

  async findBySpecialtySubject(subject: string): Promise<Mentor[]> {
    return this.prisma.mentor.findMany({
      where: { specialtySubject: subject as any },
    });
  }

  async findByModality(modality: string): Promise<Mentor[]> {
    return this.prisma.mentor.findMany({
      where: { modality: modality as any },
    });
  }

  // Advanced search for student-mentor matching - Búsqueda avanzada para matching estudiante-mentor
  async findMatchingMentors(filters: {
    campus?: string;
    subject?: string;
    modality?: string;
    language?: string;
  }): Promise<Mentor[]> {
    return this.prisma.mentor.findMany({
      where: {
        ...(filters.campus && { campus: filters.campus as any }),
        ...(filters.subject && { specialtySubject: filters.subject as any }),
        ...(filters.modality && { modality: filters.modality as any }),
        ...(filters.language && { language: filters.language as any }),
      },
    });
  }
}
