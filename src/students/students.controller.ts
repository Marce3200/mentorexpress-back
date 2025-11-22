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
import { StudentsService } from './students.service.js';
import {
  CreateStudentDto,
  UpdateStudentDto,
  StudentResponseDto,
  QueryStudentsDto,
} from './dto/student.dto.js';
import { Prisma } from '../generated/client.js';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
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
  @ApiResponse({ status: 200, description: 'Estudiante eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
