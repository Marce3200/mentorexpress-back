import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '../../generated/client.js';
import { Campus, Career, Subject, Language, Modality } from '../../generated/enums.js';

export class CreateMentorDto implements Prisma.MentorCreateInput {
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
    enum: Campus,
    example: Campus.VINA_DEL_MAR,
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera del mentor',
    enum: Career,
    example: Career.COMPUTER_ENGINEERING,
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura de especialidad',
    enum: Subject,
    example: Subject.PROGRAMMING,
  })
  specialtySubject: Subject;

  @ApiProperty({
    description: 'Idiomas que maneja el mentor',
    enum: Language,
    example: Language.SPANISH_ENGLISH,
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad de mentoría que ofrece',
    enum: Modality,
    example: Modality.ONLINE,
  })
  modality: Modality;

  @ApiProperty({
    description: 'Biografía o descripción del mentor',
    example: 'Ingeniera en Computación con 5 años de experiencia en desarrollo de software',
  })
  bio: string;

  @ApiProperty({
    description: 'Disponibilidad horaria del mentor',
    example: 'Lunes a viernes de 18:00 a 22:00, sábados de 10:00 a 14:00',
  })
  availability: string;
}

export class UpdateMentorDto implements Prisma.MentorUpdateInput {
  @ApiPropertyOptional({
    description: 'Nombre completo del mentor',
    example: 'María González Rodríguez',
  })
  fullName?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico único del mentor',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Sede universitaria donde opera',
    enum: Campus,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Carrera del mentor',
    enum: Career,
  })
  career?: Career;

  @ApiPropertyOptional({
    description: 'Asignatura de especialidad',
    enum: Subject,
  })
  specialtySubject?: Subject;

  @ApiPropertyOptional({
    description: 'Idiomas que maneja el mentor',
    enum: Language,
  })
  language?: Language;

  @ApiPropertyOptional({
    description: 'Modalidad de mentoría que ofrece',
    enum: Modality,
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
    enum: Campus,
  })
  campus: Campus;

  @ApiProperty({
    description: 'Carrera del mentor',
    enum: Career,
  })
  career: Career;

  @ApiProperty({
    description: 'Asignatura de especialidad',
    enum: Subject,
  })
  specialtySubject: Subject;

  @ApiProperty({
    description: 'Idiomas que maneja el mentor',
    enum: Language,
  })
  language: Language;

  @ApiProperty({
    description: 'Modalidad de mentoría que ofrece',
    enum: Modality,
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
    enum: Campus,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Asignatura específica (opcional)',
    enum: Subject,
  })
  subject?: Subject;

  @ApiPropertyOptional({
    description: 'Idioma preferido (opcional)',
    enum: Language,
  })
  language?: Language;

  @ApiPropertyOptional({
    description: 'Modalidad preferida (opcional)',
    enum: Modality,
  })
  modality?: Modality;
}

export class QueryMentorsDto {
  @ApiPropertyOptional({
    description: 'Filtrar por sede universitaria',
    enum: Campus,
  })
  campus?: Campus;

  @ApiPropertyOptional({
    description: 'Filtrar por asignatura de especialidad',
    enum: Subject,
  })
  subject?: Subject;

  @ApiPropertyOptional({
    description: 'Filtrar por modalidad',
    enum: Modality,
  })
  modality?: Modality;
}
