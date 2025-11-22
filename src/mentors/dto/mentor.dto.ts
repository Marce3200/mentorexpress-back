import { createZodDto } from 'nestjs-zod';
import {
  createMentorSchema,
  updateMentorSchema,
  queryMentorsSchema,
  matchMentorsSchema,
  mentorResponseSchema,
} from '../../common/validation.schemas.js';

// Create DTOs from Zod schemas
export class CreateMentorDto extends createZodDto(createMentorSchema) {}

export class UpdateMentorDto extends createZodDto(updateMentorSchema) {}

export class QueryMentorsDto extends createZodDto(queryMentorsSchema) {}

export class MatchMentorsDto extends createZodDto(matchMentorsSchema) {}

export class MentorResponseDto extends createZodDto(mentorResponseSchema) {}

// Export Zod schemas for use in controllers
export {
  createMentorSchema,
  updateMentorSchema,
  queryMentorsSchema,
  matchMentorsSchema,
};
