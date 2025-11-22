import { createZodDto } from 'nestjs-zod';
import {
  createStudentSchema,
  updateStudentSchema,
  queryStudentsSchema,
  studentResponseSchema,
} from '../../common/validation.schemas';

// Create DTOs from Zod schemas
export class CreateStudentDto extends createZodDto(createStudentSchema) {}
export class UpdateStudentDto extends createZodDto(updateStudentSchema) {}
export class QueryStudentsDto extends createZodDto(queryStudentsSchema) {}

// For response, use createZodDto with the response schema
export class StudentResponseDto extends createZodDto(studentResponseSchema) {}

// Export Zod schemas for use in controllers
export { createStudentSchema, updateStudentSchema, queryStudentsSchema };
