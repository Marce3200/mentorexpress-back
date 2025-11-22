import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  campusValues,
  careerValues,
  subjectValues,
  languageValues,
  modalityValues,
} from './schema.js';

// Type aliases for enum values
export type Campus = (typeof campusValues)[number];
export type Career = (typeof careerValues)[number];
export type Subject = (typeof subjectValues)[number];
export type Language = (typeof languageValues)[number];
export type Modality = (typeof modalityValues)[number];

// Model types
export type MentorInsert = InferInsertModel<typeof import('./schema').mentors>;
export type MentorUpdate = Partial<MentorInsert>;
export type Mentor = InferSelectModel<typeof import('./schema').mentors>;

export type StudentInsert = InferInsertModel<
  typeof import('./schema').students
>;
export type StudentUpdate = Partial<StudentInsert>;
export type Student = InferSelectModel<typeof import('./schema').students>;
