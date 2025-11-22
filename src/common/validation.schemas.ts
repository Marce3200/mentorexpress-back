import { z } from 'zod';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import {
  students,
  mentors,
  campusValues,
  careerValues,
  subjectValues,
  languageValues,
  modalityValues,
} from '../db/schema.js';

// Create Zod schemas directly from Drizzle schemas
export const createStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateStudentSchema = createInsertSchema(students)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export const studentResponseSchema = createSelectSchema(students).extend({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const queryStudentsSchema = z.object({
  campus: z.enum(campusValues).optional(),
  career: z.enum(careerValues).optional(),
  subject: z.enum(subjectValues).optional(),
});

// Mentor schemas
export const createMentorSchema = createInsertSchema(mentors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateMentorSchema = createInsertSchema(mentors)
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial();

export const mentorResponseSchema = createSelectSchema(mentors).extend({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export const queryMentorsSchema = z.object({
  campus: z.enum(campusValues).optional(),
  specialtySubject: z.enum(subjectValues).optional(),
  modality: z.enum(modalityValues).optional(),
  language: z.enum(languageValues).optional(),
});

export const matchMentorsSchema = z.object({
  campus: z.enum(campusValues).optional(),
  subject: z.enum(subjectValues).optional(),
  modality: z.enum(modalityValues).optional(),
  language: z.enum(languageValues).optional(),
});

// Type inference
export type CreateStudentDto = z.infer<typeof createStudentSchema>;
export type UpdateStudentDto = z.infer<typeof updateStudentSchema>;
export type StudentResponseDto = z.infer<typeof studentResponseSchema>;
export type QueryStudentsDto = z.infer<typeof queryStudentsSchema>;

export type CreateMentorDto = z.infer<typeof createMentorSchema>;
export type UpdateMentorDto = z.infer<typeof updateMentorSchema>;
export type MentorResponseDto = z.infer<typeof mentorResponseSchema>;
export type QueryMentorsDto = z.infer<typeof queryMentorsSchema>;
export type MatchMentorsDto = z.infer<typeof matchMentorsSchema>;
