import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    create(@Body() createStudentDto: Prisma.StudentCreateInput) {
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    findAll(
        @Query('campus') campus?: string,
        @Query('career') career?: string,
        @Query('subject') subject?: string,
    ) {
        if (campus) {
            return this.studentsService.findByCampus(campus);
        }
        if (career) {
            return this.studentsService.findByCareer(career);
        }
        if (subject) {
            return this.studentsService.findBySubject(subject);
        }
        return this.studentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: Prisma.StudentUpdateInput) {
        return this.studentsService.update(+id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.studentsService.remove(+id);
    }
}
