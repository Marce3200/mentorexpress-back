import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import {
  campusValues,
  careerValues,
  subjectValues,
  languageValues,
  modalityValues,
} from '../../db/schema';
import {
  createMentorSchema,
  updateMentorSchema,
  queryMentorsSchema,
  matchMentorsSchema,
  MentorResponseDto as ZodMentorResponseDto,
} from '../../common/validation.schemas';

// Create DTOs from Zod schemas
export class CreateMentorDto extends createZodDto(createMentorSchema) {}

export class UpdateMentorDto extends createZodDto(updateMentorSchema) {}

export class QueryMentorsDto extends createZodDto(queryMentorsSchema) {}

export class MatchMentorsDto extends createZodDto(matchMentorsSchema) {}

// For response, we can use the inferred type or create a simple class
export class MentorResponseDto {
  @ApiProperty({
    description: 'ID único del mentor',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre completo del mentor',
    example: 'María González',
  })
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico único del mentor',
    example: 'maria.gonzalez@universidad.cl',
  })
  email: string;

  @ApiProperty({
    description: 'Sede universitaria donde opera',
    enum: campusValues,
  })
  campus: ZodMentorResponseDto['campus'];

  @ApiProperty({
    description: 'Carrera del mentor',
    enum: careerValues,
  })
  career: ZodMentorResponseDto['career'];

  @ApiProperty({
    description: 'Asignatura de especialidad',
    enum: subjectValues,
  })
  specialtySubject: ZodMentorResponseDto['specialtySubject'];

  @ApiProperty({
    description: 'Idiomas que maneja el mentor',
    enum: languageValues,
  })
  language: ZodMentorResponseDto['language'];

  @ApiProperty({
    description: 'Modalidad de mentoría que ofrece',
    enum: modalityValues,
  })
  modality: ZodMentorResponseDto['modality'];

  @ApiProperty({
    description: 'Biografía o descripción del mentor',
  })
  bio: string;

  @ApiProperty({
    description: 'Disponibilidad horaria del mentor',
  })
  availability: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
}

// Export Zod schemas for use in controllers
export {
  createMentorSchema,
  updateMentorSchema,
  queryMentorsSchema,
  matchMentorsSchema,
};
