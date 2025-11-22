import { createZodDto } from 'nestjs-zod';
import {
  campusValues,
  careerValues,
  subjectValues,
  languageValues,
  modalityValues,
} from '../../db/schema';
import {
  createStudentSchema,
  updateStudentSchema,
  queryStudentsSchema,
  StudentResponseDto as ZodStudentResponseDto,
} from '../../common/validation.schemas';

// Create DTOs from Zod schemas
export class CreateStudentDto extends createZodDto(createStudentSchema) {}
export class UpdateStudentDto extends createZodDto(updateStudentSchema) {}
export class QueryStudentsDto extends createZodDto(queryStudentsSchema) {}

// For response, we can use the inferred type or create a simple class
export class StudentResponseDto {
  id: number;
  fullName: string;
  email: string;
  campus: ZodStudentResponseDto['campus'];
  career: ZodStudentResponseDto['career'];
  subject: ZodStudentResponseDto['subject'];
  currentYear: number;
  language: ZodStudentResponseDto['language'];
  modality: ZodStudentResponseDto['modality'];
  request: string;
  createdAt: Date;
  updatedAt: Date;
}
