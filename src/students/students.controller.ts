import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StudentsService } from './students.service.js';
import { ZodValidationPipe } from 'nestjs-zod';
import {
  CreateStudentDto,
  UpdateStudentDto,
  StudentResponseDto,
  QueryStudentsDto,
  createStudentSchema,
  updateStudentSchema,
  queryStudentsSchema,
} from './dto/student.dto.js';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createStudentSchema))
  @ApiOperation({ summary: 'Crear un nuevo estudiante' })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado exitosamente',
    type: StudentResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(queryStudentsSchema))
  @ApiOperation({ summary: 'Obtener todos los estudiantes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estudiantes',
    type: [StudentResponseDto],
  })
  findAll(@Query() queryDto: QueryStudentsDto) {
    const { campus, career, subject } = queryDto;
    if (campus) {
      return this.studentsService.findByCampus(campus);
    }
    if (career) {
      return this.studentsService.findByCareer(career);
    }
    if (subject) {
      return this.studentsService.findBySubject(subject);
    }
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estudiante por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID del estudiante',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado',
    type: StudentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateStudentSchema))
  @ApiOperation({ summary: 'Actualizar un estudiante' })
  @ApiParam({
    name: 'id',
    description: 'ID del estudiante',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado exitosamente',
    type: StudentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estudiante' })
  @ApiParam({
    name: 'id',
    description: 'ID del estudiante',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Post('request-help')
  @UsePipes(new ZodValidationPipe(createStudentSchema))
  @ApiOperation({
    summary: 'Procesar solicitud de ayuda con triaje y matching automático',
    description:
      'Clasifica la solicitud como académica o emocional usando ML. ' +
      'Si es emocional, deriva a Bienestar Estudiantil. ' +
      'Si es académica, busca automáticamente los mejores mentores compatibles. ' +
      'Retorna lista de candidatos para que el usuario seleccione uno.',
  })
  @ApiResponse({
    status: 201,
    description: 'Solicitud procesada exitosamente. Retorna candidatos.',
  })
  @ApiResponse({
    status: 503,
    description: 'Servicio ML no disponible',
  })
  @ApiResponse({
    status: 404,
    description: 'No hay mentores disponibles con los criterios',
  })
  async requestHelp(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.processHelpRequest(createStudentDto);
  }

  @Post(':studentId/select-mentor/:mentorId')
  @ApiOperation({
    summary: 'Confirmar selección de mentor',
    description:
      'El estudiante selecciona un mentor de la lista de candidatos. ' +
      'Se envían emails de confirmación tanto al estudiante como al mentor.',
  })
  @ApiParam({
    name: 'studentId',
    description: 'ID del estudiante',
    type: Number,
    example: 1,
  })
  @ApiParam({
    name: 'mentorId',
    description: 'ID del mentor seleccionado',
    type: Number,
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Match confirmado y emails enviados',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante o mentor no encontrado',
  })
  async selectMentor(
    @Param('studentId') studentId: string,
    @Param('mentorId') mentorId: string,
  ) {
    return this.studentsService.selectMentor(+studentId, +mentorId);
  }
}
