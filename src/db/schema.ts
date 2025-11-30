import {
  mysqlTable,
  int,
  varchar,
  text,
  mysqlEnum,
  timestamp,
} from 'drizzle-orm/mysql-core';

/**************************************** CAMPUS VALUES ******************************************/
export const campusValues = [
  /** Campus Antonio Varas */
  'ANTONIO_VARAS',
  /** Campus Viña del Mar */
  'VINA_DEL_MAR',
  /** Campus Concepción */
  'CONCEPCION',
] as const;

/**************************************** CAREER VALUES ******************************************/
export const careerValues = [
  /** Ingeniería Civil */
  'CIVIL_ENGINEERING',
  /** Ingeniería en Computación */
  'COMPUTER_ENGINEERING',
  /** Ingeniería Eléctrica */
  'ELECTRICAL_ENGINEERING',
  /** Ingeniería Industrial */
  'INDUSTRIAL_ENGINEERING',
] as const;

/**************************************** SUBJECT VALUES ******************************************/
export const subjectValues = [
  /** Cálculo I */
  'CALCULUS_I',
  /** Álgebra Lineal */
  'LINEAR_ALGEBRA',
  /** Física */
  'PHYSICS',
  /** Programación */
  'PROGRAMMING',
  /** Electrónica */
  'ELECTRONICS',
] as const;

/**************************************** LANGUAGE VALUES ******************************************/
export const languageValues = [
  /** Español */
  'SPANISH',
  /** Inglés */
  'ENGLISH',
  /** Español e Inglés */
  'SPANISH_ENGLISH',
] as const;

/**************************************** MODALITY VALUES ******************************************/
export const modalityValues = [
  /** Presencial */
  'IN_PERSON',
  /** Online */
  'ONLINE',
] as const;

/**
 * Enum para campus universitarios
 */
export const campusEnum = mysqlEnum('campus', campusValues);
/**
 * Enum para carreras de ingeniería
 */
export const careerEnum = mysqlEnum('career', careerValues);
/**
 * Enum para asignaturas
 */
export const subjectEnum = mysqlEnum('subject', subjectValues);
/**
 * Enum para idiomas
 */
export const languageEnum = mysqlEnum('language', languageValues);
/**
 * Enum para modalidades de mentoría
 */
export const modalityEnum = mysqlEnum('modality', modalityValues);

/**
 * Tabla de Estudiantes - Almacena información de estudiantes que buscan mentoría
 */
export const students = mysqlTable('students', {
  /**
   * ID único del estudiante (autoincremental)
   */
  id: int('id').primaryKey().autoincrement(),
  /**
   * Nombre completo del estudiante
   */
  fullName: varchar('full_name', { length: 255 }).notNull(),
  /**
   * Email único del estudiante
   */
  email: varchar('email', { length: 255 }).unique().notNull(),
  /**
   * Campus universitario del estudiante
   */
  campus: campusEnum.notNull(),
  /**
   * Carrera de ingeniería del estudiante
   */
  career: careerEnum.notNull(),
  /**
   * Asignatura en la que necesita ayuda
   */
  subject: subjectEnum.notNull(),
  /**
   * Año cursante actual (1, 2, etc.)
   */
  currentYear: int('current_year').notNull(),
  /**
   * Idioma de preferencia para la mentoría
   */
  language: languageEnum.notNull(),
  /**
   * Modalidad preferida (presencial/online)
   */
  modality: modalityEnum.notNull(),
  /**
   * Descripción detallada de la solicitud de ayuda
   */
  request: text('request').notNull(),
  /**
   * Fecha de creación del registro
   */
  createdAt: timestamp('created_at').defaultNow().notNull(),
  /**
   * Fecha de última actualización
   */
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

/**
 * Tabla de Mentores - Almacena información de mentores disponibles para brindar ayuda
 */
export const mentors = mysqlTable('mentors', {
  /**
   * ID único del mentor (autoincremental)
   */
  id: int('id').primaryKey().autoincrement(),
  /**
   * Nombre completo del mentor
   */
  fullName: varchar('full_name', { length: 255 }).notNull(),
  /**
   * Email único del mentor
   */
  email: varchar('email', { length: 255 }).unique().notNull(),
  /**
   * Campus universitario del mentor
   */
  campus: campusEnum.notNull(),
  /**
   * Carrera de ingeniería del mentor
   */
  career: careerEnum.notNull(),
  /**
   * Asignatura de especialidad del mentor
   */
  specialtySubject: mysqlEnum('specialty_subject', subjectValues).notNull(),
  /**
   * Idioma en que puede brindar mentoría
   */
  language: languageEnum.notNull(),
  /**
   * Modalidad disponible (presencial/online)
   */
  modality: modalityEnum.notNull(),
  /**
   * Biografía del mentor
   */
  bio: text('bio').notNull(),
  /**
   * Fecha de creación del registro
   */
  createdAt: timestamp('created_at').defaultNow().notNull(),
  /**
   * Fecha de última actualización
   */
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
