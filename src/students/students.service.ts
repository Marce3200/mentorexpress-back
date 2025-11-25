import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { students } from '../db/schema.js';
import {
  Campus,
  Career,
  Subject,
  StudentInsert,
  StudentUpdate,
  Student,
} from '../db/types.js';
import { eq, desc } from 'drizzle-orm';
import { DrizzleService } from '../db/drizzle.service.js';
import { MlClientService } from '../ml/ml-client.service.js';
import { MentorsService } from '../mentors/mentors.service.js';
import { EmailService } from '../email/email.service.js';

export interface HelpRequestResult {
  student: Student;
  triaje: {
    tipo: 'academica' | 'emocional';
    confianza: number;
  };
  resultado:
    | {
        tipo: 'emocional';
        mensaje: string;
        accion: 'derivar_bienestar';
      }
    | {
        tipo: 'academica';
        mentores: Array<{
          id: number;
          fullName: string;
          email: string;
          matchScore: number;
          campus: string;
          career: string;
          specialtySubject: string;
        }>;
        mensaje: string;
      };
}

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    private drizzleService: DrizzleService,
    private mlClientService: MlClientService,
    private mentorsService: MentorsService,
    private emailService: EmailService,
  ) {}

  async create(data: StudentInsert): Promise<Student> {
    const result = await this.drizzleService.db
      .insert(students)
      .values(data)
      .$returningId();
    const [inserted] = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, result[0].id));
    return inserted;
  }

  async findAll(): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .orderBy(desc(students.createdAt));
  }

  async findOne(id: number): Promise<Student | null> {
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, id));
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<Student | null> {
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.email, email));
    return result[0] || null;
  }

  async update(id: number, data: StudentUpdate): Promise<Student> {
    await this.drizzleService.db
      .update(students)
      .set(data)
      .where(eq(students.id, id));
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, id));
    return result[0];
  }

  async remove(id: number): Promise<Student> {
    const result = await this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.id, id));
    await this.drizzleService.db.delete(students).where(eq(students.id, id));
    return result[0];
  }

  // Specific searches - Búsquedas específicas
  async findByCampus(campus: Campus): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.campus, campus));
  }

  async findByCareer(career: Career): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.career, career));
  }

  async findBySubject(subject: Subject): Promise<Student[]> {
    return this.drizzleService.db
      .select()
      .from(students)
      .where(eq(students.subject, subject));
  }

  /**
   * Procesa una solicitud de ayuda completa con triaje y matching automático
   */
  async processHelpRequest(data: StudentInsert): Promise<HelpRequestResult> {
    this.logger.log(`Procesando solicitud de ayuda para: ${data.email}`);

    // 1. Guardar estudiante en DB
    const student = await this.create(data);
    this.logger.log(`Estudiante creado con ID: ${student.id}`);

    // 2. Clasificar solicitud con ML (Triaje)
    const triaje = await this.mlClientService.classifyRequest(data.request);

    // 3. Si es EMOCIONAL → Derivar a Bienestar
    if (triaje.tipo_recomendado === 'emocional') {
      this.logger.log(
        'Solicitud clasificada como EMOCIONAL - Derivando a bienestar',
      );

      // Enviar email de derivación
      await this.emailService.sendEmotionalSupportEmail({
        email: student.email,
        fullName: student.fullName,
      });

      return {
        student,
        triaje: {
          tipo: 'emocional',
          confianza: triaje.confianza,
        },
        resultado: {
          tipo: 'emocional',
          mensaje:
            'Tu solicitud ha sido clasificada como apoyo emocional. ' +
            'Te recomendamos contactar con Bienestar Estudiantil para ' +
            'recibir el apoyo que necesitas. Te hemos enviado un email con más información.',
          accion: 'derivar_bienestar',
        },
      };
    }

    // 4. Si es ACADÉMICA → Buscar mentores compatibles
    this.logger.log('Solicitud clasificada como ACADÉMICA - Buscando mentores');

    // 4.1 Obtener mentores potenciales con filtros básicos
    const allMentors = await this.mentorsService.findMatchingMentors({
      campus: data.campus,
      subject: data.subject,
      modality: data.modality,
      language: data.language,
    });

    if (allMentors.length === 0) {
      throw new HttpException(
        'No hay mentores disponibles con esos criterios',
        HttpStatus.NOT_FOUND,
      );
    }

    this.logger.log(`Mentores potenciales encontrados: ${allMentors.length}`);

    // 4.2 Mapear a formato del ML
    const mentorsForML = allMentors.map((mentor) => ({
      id: mentor.id,
      campus: this.mapEnumToSpanish(mentor.campus),
      carrera: this.mapEnumToSpanish(mentor.career),
      especialidad: this.mapEnumToSpanish(mentor.specialtySubject),
      idioma: this.mapEnumToSpanish(mentor.language),
      modalidad: this.mapEnumToSpanish(mentor.modality),
      bio: mentor.bio,
    }));

    const studentForML = {
      campus: this.mapEnumToSpanish(data.campus),
      carrera: this.mapEnumToSpanish(data.career),
      asignatura: this.mapEnumToSpanish(data.subject),
      idioma: this.mapEnumToSpanish(data.language),
      modalidad: this.mapEnumToSpanish(data.modality),
      solicitud: data.request,
    };

    // 4.3 Obtener matching con ML
    const matchResults = await this.mlClientService.findBestMentors(
      studentForML,
      mentorsForML,
      5, // Top 5 mentores
    );

    // 4.4 Enriquecer resultados con datos completos del mentor
    const mentoresCompatibles = matchResults.map((match) => {
      const mentor = allMentors.find((m) => m.id === match.mentor_id)!;
      return {
        id: mentor.id,
        fullName: mentor.fullName,
        email: mentor.email,
        matchScore: match.match_score,
        campus: mentor.campus,
        career: mentor.career,
        specialtySubject: mentor.specialtySubject,
      };
    });

    this.logger.log(
      `Matching completado. Mejores mentores: ${mentoresCompatibles.length}`,
    );

    // 5. Enviar emails
    await this.emailService.sendMatchResultsEmail(
      {
        email: student.email,
        fullName: student.fullName,
      },
      mentoresCompatibles,
    );

    // Enviar email a cada mentor
    for (const mentor of mentoresCompatibles) {
      await this.emailService.sendMentorMatchEmail(
        {
          email: mentor.email,
          fullName: mentor.fullName,
        },
        {
          fullName: student.fullName,
          subject: this.mapEnumToSpanish(student.subject),
          request: student.request,
        },
      );
    }

    return {
      student,
      triaje: {
        tipo: 'academica',
        confianza: triaje.confianza,
      },
      resultado: {
        tipo: 'academica',
        mentores: mentoresCompatibles,
        mensaje:
          `Hemos encontrado ${mentoresCompatibles.length} mentores compatibles. ` +
          'Te hemos enviado un email con más información.',
      },
    };
  }

  /**
   * Mapea enums de DB a español para el ML
   */
  private mapEnumToSpanish(value: string): string {
    const mappings: Record<string, string> = {
      // Campus
      ANTONIO_VARAS: 'Antonio Varas',
      VINA_DEL_MAR: 'Viña del Mar',
      CONCEPCION: 'Concepción',
      // Carreras
      CIVIL_ENGINEERING: 'Ingeniería Civil',
      COMPUTER_ENGINEERING: 'Ingeniería en Computación',
      ELECTRICAL_ENGINEERING: 'Ingeniería Eléctrica',
      INDUSTRIAL_ENGINEERING: 'Ingeniería Industrial',
      // Asignaturas
      CALCULUS_I: 'Cálculo I',
      LINEAR_ALGEBRA: 'Álgebra Lineal',
      PHYSICS: 'Física',
      PROGRAMMING: 'Programación',
      ELECTRONICS: 'Electrónica',
      // Idiomas
      SPANISH: 'español',
      ENGLISH: 'inglés',
      SPANISH_ENGLISH: 'español/inglés',
      // Modalidades
      IN_PERSON: 'presencial',
      ONLINE: 'online',
    };
    return mappings[value] || value;
  }
}
