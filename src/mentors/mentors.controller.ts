import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MentorsService } from './mentors.service.js';
import { Prisma } from '@prisma/client';

@Controller('mentors')
export class MentorsController {
    constructor(private readonly mentorsService: MentorsService) { }

    @Post()
    create(@Body() createMentorDto: Prisma.MentorCreateInput) {
        return this.mentorsService.create(createMentorDto);
    }

    @Get()
    findAll(
        @Query('campus') campus?: string,
        @Query('subject') subject?: string,
        @Query('modality') modality?: string,
    ) {
        if (campus) {
            return this.mentorsService.findByCampus(campus);
        }
        if (subject) {
            return this.mentorsService.findBySpecialtySubject(subject);
        }
        if (modality) {
            return this.mentorsService.findByModality(modality);
        }
        return this.mentorsService.findAll();
    }

    @Get('match')
    findMatching(
        @Query('campus') campus?: string,
        @Query('subject') subject?: string,
        @Query('modality') modality?: string,
        @Query('language') language?: string,
    ) {
        return this.mentorsService.findMatchingMentors({
            campus,
            subject,
            modality,
            language,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mentorsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMentorDto: Prisma.MentorUpdateInput) {
        return this.mentorsService.update(+id, updateMentorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mentorsService.remove(+id);
    }
}
