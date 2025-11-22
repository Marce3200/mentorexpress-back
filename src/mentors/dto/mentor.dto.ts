import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  campusValues,
  careerValues,
  subjectValues,
  languageValues,
  modalityValues,
} from '../../db/schema';
import type {
  Campus,
  Career,
  Subject,
  Language,
  Modality,
  MentorInsert,
  Mentor,
} from '../../db/types';

export class CreateMentorDto
  implements Omit<MentorInsert, 'id' | 'createdAt' | 'updatedAt'>
{
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
    example: 'VINA_DEL_MAR',
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera del mentor',
    enum: careerValues,
    example: 'COMPUTER_ENGINEERING',
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura de especialidad',
    enum: subjectValues,
    example: 'PROGRAMMING',
  })
  specialtySubject: Subject;

  @ApiProperty({
    description: 'Idiomas que maneja el mentor',
    enum: languageValues,
    example: 'SPANISH_ENGLISH',
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad de mentoría que ofrece',
    enum: modalityValues,
    example: 'ONLINE',
  })
  modality: Modality;

  @ApiProperty({
    description: 'Biografía o descripción del mentor',
    example:
      'Ingeniera en Computación con 5 años de experiencia en desarrollo web',
  })
  bio: string;

  @ApiProperty({
    description: 'Disponibilidad horaria del mentor',
    example: 'Lunes a viernes de 18:00 a 22:00',
  })
  availability: string;
}

export class UpdateMentorDto
  implements Partial<Omit<MentorInsert, 'id' | 'createdAt' | 'updatedAt'>>
{
  @ApiPropertyOptional({
    description: 'Nombre completo del mentor',
    example: 'María González Pérez',
  })
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico único del mentor',
    example: 'maria.gonzalez.perez@universidad.cl',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Sede universitaria donde opera',
    enum: campusValues,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Carrera del mentor',
    enum: careerValues,
  })
  career?: Career;

  @ApiPropertyOptional({
    description: 'Asignatura de especialidad',
    enum: subjectValues,
  })
  specialtySubject?: Subject;

  @ApiPropertyOptional({
    description: 'Idiomas que maneja el mentor',
    enum: languageValues,
  })
  language?: Language;

  @ApiPropertyOptional({
    description: 'Modalidad de mentoría que ofrece',
    enum: modalityValues,
  })
  modality?: Modality;

  @ApiPropertyOptional({
    description: 'Biografía o descripción del mentor',
  })
  bio?: string;

  @ApiPropertyOptional({
    description: 'Disponibilidad horaria del mentor',
  })
  availability?: string;
}

export class MentorResponseDto implements Mentor {
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
  campus: Campus;

  @ApiProperty({
    description: 'Carrera del mentor',
    enum: careerValues,
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura de especialidad',
    enum: subjectValues,
  })
  specialtySubject: Subject;

  @ApiProperty({
    description: 'Idiomas que maneja el mentor',
    enum: languageValues,
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad de mentoría que ofrece',
    enum: modalityValues,
  })
  modality: Modality;

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

export class MatchMentorsDto {
  @ApiPropertyOptional({
    description: 'Sede específica (opcional)',
    enum: campusValues,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Asignatura específica (opcional)',
    enum: subjectValues,
  })
  subject?: Subject;

  @ApiPropertyOptional({
    description: 'Idioma preferido (opcional)',
    enum: languageValues,
  })
  language?: Language;

  @ApiPropertyOptional({
    description: 'Modalidad preferida (opcional)',
    enum: modalityValues,
  })
  modality?: Modality;
}

export class QueryMentorsDto {
  @ApiPropertyOptional({
    description: 'Filtrar por sede universitaria',
    enum: campusValues,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Filtrar por asignatura de especialidad',
    enum: subjectValues,
  })
  specialtySubject?: Subject;

  @ApiPropertyOptional({
    description: 'Filtrar por modalidad',
    enum: modalityValues,
  })
  modality?: Modality;

  @ApiPropertyOptional({
    description: 'Filtrar por idioma',
    enum: languageValues,
  })
  language?: Language;
}
