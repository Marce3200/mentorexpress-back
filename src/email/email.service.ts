import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  /**
   * Envía email al estudiante confirmando el match con el mentor seleccionado
   */
  async sendMatchConfirmationToStudent(data: {
    email: string;
    fullName: string;
    mentor: {
      fullName: string;
      email: string;
      specialtySubject: string;
      availability: string;
    };
  }): Promise<void> {
    // TODO: Implementar con Nodemailer, SendGrid, etc.
    this.logger.log(
      `📧 Enviando confirmación de match a estudiante: ${data.email}`,
    );
    this.logger.log(`
      ═══════════════════════════════════════════════════════════
      Para: ${data.email}
      Asunto: ¡Match confirmado con tu mentor!
      ───────────────────────────────────────────────────────────
      Hola ${data.fullName},
      
      ¡Excelente noticia! Tu solicitud ha sido confirmada.
      
      Tu mentor asignado es:
      👤 Nombre: ${data.mentor.fullName}
      📧 Email: ${data.mentor.email}
      📚 Especialidad: ${data.mentor.specialtySubject}
      🕐 Disponibilidad: ${data.mentor.availability}
      
      Tu mentor te contactará pronto para coordinar la sesión.
      También puedes contactarle directamente al email proporcionado.
      
      ¡Mucho éxito en tus estudios!
      
      Equipo MentorExpress
      ═══════════════════════════════════════════════════════════
    `);
  }

  /**
   * Envía email al mentor confirmando el match con el estudiante
   */
  async sendMatchConfirmationToMentor(data: {
    email: string;
    fullName: string;
    student: {
      fullName: string;
      email: string;
      subject: string;
      request: string;
    };
  }): Promise<void> {
    this.logger.log(
      `📧 Enviando confirmación de match a mentor: ${data.email}`,
    );
    this.logger.log(`
      ═══════════════════════════════════════════════════════════
      Para: ${data.email}
      Asunto: Nuevo estudiante asignado
      ───────────────────────────────────────────────────────────
      Hola ${data.fullName},
      
      Has sido seleccionado para ayudar a un estudiante.
      
      Información del estudiante:
      👤 Nombre: ${data.student.fullName}
      📧 Email: ${data.student.email}
      📚 Asignatura: ${data.student.subject}
      
      Solicitud:
      "${data.student.request}"
      
      Por favor contacta al estudiante lo antes posible para
      coordinar la sesión de ayuda.
      
      ¡Gracias por ser parte de MentorExpress!
      
      Equipo MentorExpress
      ═══════════════════════════════════════════════════════════
    `);
  }
}
