import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { MentorsService } from './mentors.service.js';
import {
  CreateMentorDto,
  UpdateMentorDto,
  MentorResponseDto,
  MatchMentorsDto,
  QueryMentorsDto,
} from './dto/mentor.dto.js';
import { Prisma } from '../generated/client.js';
import { Campus, Career, Subject, Language, Modality } from '../generated/enums.js';

@ApiTags('mentors')
@Controller('mentors')
export class MentorsController {
  constructor(private readonly mentorsService: MentorsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo mentor' })
  @ApiResponse({
    status: 201,
    description: 'Mentor creado exitosamente',
    type: MentorResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createMentorDto: CreateMentorDto) {
    return this.mentorsService.create(createMentorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los mentores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mentores',
    type: [MentorResponseDto],
  })
  findAll(@Query() queryDto: QueryMentorsDto) {
    const { campus, subject, modality } = queryDto;
    if (campus) {
      return this.mentorsService.findByCampus(campus);
    }
    if (subject) {
      return this.mentorsService.findBySpecialtySubject(subject);
    }
    if (modality) {
      return this.mentorsService.findByModality(modality);
    }
    return this.mentorsService.findAll();
  }

  @Get('match')
  @ApiOperation({ summary: 'Buscar mentores compatibles con criterios específicos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mentores compatibles',
    type: [MentorResponseDto],
  })
  findMatching(@Query() matchDto: MatchMentorsDto) {
    return this.mentorsService.findMatchingMentors(matchDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un mentor por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del mentor',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mentor encontrado',
    type: MentorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Mentor no encontrado' })
  findOne(@Param('id') id: string) {
    return this.mentorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un mentor' })
  @ApiParam({
    name: 'id',
    description: 'ID del mentor',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mentor actualizado exitosamente',
    type: MentorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Mentor no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateMentorDto: UpdateMentorDto) {
    return this.mentorsService.update(+id, updateMentorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un mentor' })
  @ApiParam({
    name: 'id',
    description: 'ID del mentor',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Mentor eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Mentor no encontrado' })
  remove(@Param('id') id: string) {
    return this.mentorsService.remove(+id);
  }
}
