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
  StudentInsert,
  Student,
} from '../../db/types';

export class CreateStudentDto
  implements Omit<StudentInsert, 'id' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty({
    description: 'Nombre completo del estudiante',
    example: 'Juan Pérez',
  })
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico único del estudiante',
    example: 'juan.perez@universidad.cl',
  })
  email: string;

  @ApiProperty({
    description: 'Sede universitaria',
    enum: campusValues,
    example: 'VINA_DEL_MAR',
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera que cursa',
    enum: careerValues,
    example: 'COMPUTER_ENGINEERING',
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura en la que necesita ayuda',
    enum: subjectValues,
    example: 'PROGRAMMING',
  })
  subject: Subject;

  @ApiProperty({
    description: 'Año actual que está cursando',
    minimum: 1,
    maximum: 2,
    example: 1,
  })
  currentYear: number;

  @ApiProperty({
    description: 'Idioma preferido para la mentoría',
    enum: languageValues,
    example: 'SPANISH_ENGLISH',
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad preferida',
    enum: modalityValues,
    example: 'ONLINE',
  })
  modality: Modality;

  @ApiProperty({
    description: 'Descripción de la solicitud de mentoría',
    example: 'Necesito ayuda con algoritmos y estructuras de datos en Python',
  })
  request: string;
}

export class UpdateStudentDto
  implements Partial<Omit<StudentInsert, 'id' | 'createdAt' | 'updatedAt'>>
{
  @ApiPropertyOptional({
    description: 'Nombre completo del estudiante',
    example: 'Juan Pérez García',
  })
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico único del estudiante',
    example: 'juan.perez.garcia@universidad.cl',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Sede universitaria',
    enum: campusValues,
  })
  campus?: (typeof campusValues)[number];

  @ApiPropertyOptional({
    description: 'Carrera que cursa',
    enum: careerValues,
  })
  career?: (typeof careerValues)[number];

  @ApiPropertyOptional({
    description: 'Asignatura en la que necesita ayuda',
    enum: subjectValues,
  })
  subject?: (typeof subjectValues)[number];

  @ApiPropertyOptional({
    description: 'Año actual que está cursando',
    minimum: 1,
    maximum: 2,
  })
  currentYear?: number;

  @ApiPropertyOptional({
    description: 'Idioma preferido para la mentoría',
    enum: languageValues,
  })
  language?: (typeof languageValues)[number];

  @ApiPropertyOptional({
    description: 'Modalidad preferida',
    enum: modalityValues,
  })
  modality?: (typeof modalityValues)[number];

  @ApiPropertyOptional({
    description: 'Descripción de la solicitud de mentoría',
  })
  request?: string;
}

export class StudentResponseDto implements Student {
  @ApiProperty({
    description: 'ID único del estudiante',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre completo del estudiante',
    example: 'Juan Pérez',
  })
  fullName: string;

  @ApiProperty({
    description: 'Correo electrónico único del estudiante',
    example: 'juan.perez@universidad.cl',
  })
  email: string;

  @ApiProperty({
    description: 'Sede universitaria',
    enum: campusValues,
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera que cursa',
    enum: careerValues,
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura en la que necesita ayuda',
    enum: subjectValues,
  })
  subject: Subject;

  @ApiProperty({
    description: 'Año actual que está cursando',
  })
  currentYear: number;

  @ApiProperty({
    description: 'Idioma preferido para la mentoría',
    enum: languageValues,
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad preferida',
    enum: modalityValues,
  })
  modality: Modality;

  @ApiProperty({
    description: 'Descripción de la solicitud de mentoría',
  })
  request: string;

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

export class QueryStudentsDto {
  @ApiPropertyOptional({
    description: 'Filtrar por sede universitaria',
    enum: campusValues,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Filtrar por carrera',
    enum: careerValues,
  })
  career?: Career;

  @ApiPropertyOptional({
    description: 'Filtrar por asignatura',
    enum: subjectValues,
  })
  subject?: Subject;
}
