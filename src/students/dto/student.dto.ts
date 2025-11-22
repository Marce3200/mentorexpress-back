import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '../../generated/client.js';
import { Campus, Career, Subject, Language, Modality } from '../../generated/enums.js';

export class CreateStudentDto implements Prisma.StudentCreateInput {
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
    enum: Campus,
    example: Campus.VINA_DEL_MAR,
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera que cursa',
    enum: Career,
    example: Career.COMPUTER_ENGINEERING,
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura en la que necesita ayuda',
    enum: Subject,
    example: Subject.PROGRAMMING,
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
    enum: Language,
    example: Language.SPANISH_ENGLISH,
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad preferida',
    enum: Modality,
    example: Modality.ONLINE,
  })
  modality: Modality;

  @ApiProperty({
    description: 'Descripción de la solicitud de mentoría',
    example: 'Necesito ayuda con algoritmos y estructuras de datos en Python',
  })
  request: string;
}

export class UpdateStudentDto implements Prisma.StudentUpdateInput {
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
    enum: Campus,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Carrera que cursa',
    enum: Career,
  })
  career?: Career;

  @ApiPropertyOptional({
    description: 'Asignatura en la que necesita ayuda',
    enum: Subject,
  })
  subject?: Subject;

  @ApiPropertyOptional({
    description: 'Año actual que está cursando',
    minimum: 1,
    maximum: 2,
  })
  currentYear?: number;

  @ApiPropertyOptional({
    description: 'Idioma preferido para la mentoría',
    enum: Language,
  })
  language?: Language;

  @ApiPropertyOptional({
    description: 'Modalidad preferida',
    enum: Modality,
  })
  modality?: Modality;

  @ApiPropertyOptional({
    description: 'Descripción de la solicitud de mentoría',
  })
  request?: string;
}

export class StudentResponseDto {
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
    enum: Campus,
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera que cursa',
    enum: Career,
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura en la que necesita ayuda',
    enum: Subject,
  })
  subject: Subject;

  @ApiProperty({
    description: 'Año actual que está cursando',
  })
  currentYear: number;

  @ApiProperty({
    description: 'Idioma preferido para la mentoría',
    enum: Language,
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad preferida',
    enum: Modality,
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
