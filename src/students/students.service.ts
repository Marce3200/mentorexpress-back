import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Student, Prisma } from '@prisma/client';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.StudentCreateInput): Promise<Student> {
        return this.prisma.student.create({ data });
    }

    async findAll(): Promise<Student[]> {
        return this.prisma.student.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number): Promise<Student | null> {
        return this.prisma.student.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<Student | null> {
        return this.prisma.student.findUnique({
            where: { email },
        });
    }

    async update(id: number, data: Prisma.StudentUpdateInput): Promise<Student> {
        return this.prisma.student.update({
            where: { id },
            data,
        });
    }

    async remove(id: number): Promise<Student> {
        return this.prisma.student.delete({
            where: { id },
        });
    }

    // Specific searches - Búsquedas específicas
    async findByCampus(campus: string): Promise<Student[]> {
        return this.prisma.student.findMany({
            where: { campus: campus as any },
        });
    }

    async findByCareer(career: string): Promise<Student[]> {
        return this.prisma.student.findMany({
            where: { career: career as any },
        });
    }

    async findBySubject(subject: string): Promise<Student[]> {
        return this.prisma.student.findMany({
            where: { subject: subject as any },
        });
    }
}
