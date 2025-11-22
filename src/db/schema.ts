import {
  mysqlTable,
  int,
  varchar,
  text,
  mysqlEnum,
  timestamp,
} from 'drizzle-orm/mysql-core';

// Enum values
export const campusValues = [
  'ANTONIO_VARAS',
  'VINA_DEL_MAR',
  'CONCEPCION',
] as const;
export const careerValues = [
  'CIVIL_ENGINEERING',
  'COMPUTER_ENGINEERING',
  'ELECTRICAL_ENGINEERING',
  'INDUSTRIAL_ENGINEERING',
] as const;
export const subjectValues = [
  'CALCULUS_I',
  'LINEAR_ALGEBRA',
  'PHYSICS',
  'PROGRAMMING',
  'ELECTRONICS',
] as const;
export const languageValues = [
  'SPANISH',
  'ENGLISH',
  'SPANISH_ENGLISH',
] as const;
export const modalityValues = ['IN_PERSON', 'ONLINE'] as const;

// Enums
export const campusEnum = mysqlEnum('campus', campusValues);
export const careerEnum = mysqlEnum('career', careerValues);
export const subjectEnum = mysqlEnum('subject', subjectValues);
export const languageEnum = mysqlEnum('language', languageValues);
export const modalityEnum = mysqlEnum('modality', modalityValues);

// Students table
export const students = mysqlTable('students', {
  id: int('id').primaryKey().autoincrement(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  campus: campusEnum.notNull(),
  career: careerEnum.notNull(),
  subject: subjectEnum.notNull(),
  currentYear: int('current_year').notNull(),
  language: languageEnum.notNull(),
  modality: modalityEnum.notNull(),
  request: text('request').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});

// Mentors table
export const mentors = mysqlTable('mentors', {
  id: int('id').primaryKey().autoincrement(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  campus: campusEnum.notNull(),
  career: careerEnum.notNull(),
  specialtySubject: mysqlEnum('specialty_subject', subjectValues).notNull(),
  language: languageEnum.notNull(),
  modality: modalityEnum.notNull(),
  bio: text('bio').notNull(),
  availability: text('availability').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
