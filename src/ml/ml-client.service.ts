import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';

export interface TriajeResult {
  solicitud: string;
  tipo_recomendado: 'academica' | 'emocional';
  confianza: number;
  probabilidades: {
    academica: number;
    emocional: number;
  };
}

export interface MatchResult {
  mentor_id: number;
  match_score: number;
  text_similarity: number;
  match_details: {
    match_campus: number;
    match_carrera: number;
    match_asignatura: number;
    match_idioma: number;
    match_modalidad: number;
  };
}

@Injectable()
export class MlClientService {
  private readonly logger = new Logger(MlClientService.name);
  private readonly mlServiceUrl: string;

  constructor(private configService: ConfigService) {
    this.mlServiceUrl =
      this.configService.get<string>('ML_SERVICE_URL') ??
      'http://localhost:8000';
    this.logger.log(`ML Service URL configurado: ${this.mlServiceUrl}`);
  }

  /**
   * Clasifica una solicitud como académica o emocional usando el modelo de triaje
   */
  async classifyRequest(solicitud: string): Promise<TriajeResult> {
    try {
      this.logger.log(
        `Clasificando solicitud: "${solicitud.substring(0, 50)}..."`,
      );

      const response = await axios.post<TriajeResult>(
        `${this.mlServiceUrl}/triaje`,
        { solicitud },
        {
          timeout: 5000,
          headers: { 'Content-Type': 'application/json' },
        },
      );

      this.logger.log(
        `Triaje completado: ${response.data.tipo_recomendado} (confianza: ${response.data.confianza})`,
      );

      return response.data;
    } catch (error) {
      this.logger.error('Error al clasificar solicitud con ML', error);

      if (error instanceof AxiosError) {
        if (error.code === 'ECONNREFUSED') {
          throw new HttpException(
            'Servicio ML no disponible. Por favor verifica que esté corriendo en ' +
              this.mlServiceUrl,
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }
        throw new HttpException(
          `Error en servicio ML: ${error.message}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        'Error al clasificar solicitud',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Encuentra los mejores mentores para un estudiante usando el modelo de matching
   */
  async findBestMentors(
    student: {
      campus: string;
      carrera: string;
      asignatura: string;
      idioma: string;
      modalidad: string;
      solicitud: string;
    },
    mentors: Array<{
      id: number;
      campus: string;
      carrera: string;
      especialidad: string;
      idioma: string;
      modalidad: string;
      bio: string;
    }>,
    topK: number = 5,
  ): Promise<MatchResult[]> {
    try {
      this.logger.log(
        `Buscando matches para estudiante. Total mentores: ${mentors.length}, Top K: ${topK}`,
      );

      const response = await axios.post<MatchResult[]>(
        `${this.mlServiceUrl}/match`,
        {
          student,
          mentors,
          top_k: topK,
        },
        {
          timeout: 10000,
          headers: { 'Content-Type': 'application/json' },
        },
      );

      this.logger.log(
        `Matching completado. Mentores encontrados: ${response.data.length}`,
      );

      return response.data;
    } catch (error) {
      this.logger.error('Error al obtener matching con ML', error);

      if (error instanceof AxiosError) {
        if (error.code === 'ECONNREFUSED') {
          throw new HttpException(
            'Servicio ML no disponible',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }
        throw new HttpException(
          `Error en servicio ML: ${error.message}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        'Error al buscar mentores compatibles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Verifica que el servicio ML esté disponible
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.mlServiceUrl}/health`, {
        timeout: 3000,
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
