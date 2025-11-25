import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  /**
   * Envía email al estudiante con resultado de triaje emocional
   */
  async sendEmotionalSupportEmail(student: {
    email: string;
    fullName: string;
  }): Promise<void> {
    // TODO: Implementar con Nodemailer, SendGrid, etc.
    this.logger.log(`📧 Enviando email de apoyo emocional a: ${student.email}`);
    this.logger.log(`
      ═══════════════════════════════════════════════════════════
      Para: ${student.email}
      Asunto: Derivación a Bienestar Estudiantil
      ───────────────────────────────────────────────────────────
      Hola ${student.fullName},
      
      Hemos recibido tu solicitud y notamos que podrías beneficiarte
      del apoyo de nuestro equipo de Bienestar Estudiantil.
      
      Te invitamos a contactar con ellos para recibir el apoyo
      emocional que necesitas.
      
      📞 Contacto: bienestar@universidad.cl
      📱 Teléfono: +56 2 1234 5678
      🏢 Oficina: Edificio Central, 2do piso
      
      ¡Estamos aquí para apoyarte!
      
      Equipo MentorExpress
      ═══════════════════════════════════════════════════════════
    `);
  }

  /**
   * Envía email al estudiante con mentores compatibles
   */
  async sendMatchResultsEmail(
    student: { email: string; fullName: string },
    mentors: Array<{ fullName: string; email: string; matchScore: number }>,
  ): Promise<void> {
    this.logger.log(`📧 Enviando resultados de matching a: ${student.email}`);
    this.logger.log(`
      ═══════════════════════════════════════════════════════════
      Para: ${student.email}
      Asunto: ¡Hemos encontrado mentores para ti!
      ───────────────────────────────────────────────────────────
      Hola ${student.fullName},
      
      ¡Buenas noticias! Hemos encontrado ${mentors.length} mentores
      compatibles con tu solicitud:
      
      ${mentors
        .map(
          (m, i) =>
            `${i + 1}. ${m.fullName} - ${(m.matchScore * 100).toFixed(0)}% compatibilidad`,
        )
        .join('\n      ')}
      
      Los mentores recibirán tu solicitud y pronto te contactarán
      para coordinar una sesión de ayuda.
      
      ¡Mucho éxito en tus estudios!
      
      Equipo MentorExpress
      ═══════════════════════════════════════════════════════════
    `);
  }

  /**
   * Envía email al mentor notificándole de un match
   */
  async sendMentorMatchEmail(
    mentor: { email: string; fullName: string },
    student: { fullName: string; subject: string; request: string },
  ): Promise<void> {
    this.logger.log(
      `📧 Enviando notificación de match a mentor: ${mentor.email}`,
    );
    this.logger.log(`
      ═══════════════════════════════════════════════════════════
      Para: ${mentor.email}
      Asunto: Nuevo estudiante compatible con tu perfil
      ───────────────────────────────────────────────────────────
      Hola ${mentor.fullName},
      
      Un estudiante (${student.fullName}) necesita ayuda en ${student.subject}:
      
      "${student.request}"
      
      Por favor revisa tu disponibilidad y contacta al estudiante
      lo antes posible.
      
      ¡Gracias por ser parte de MentorExpress!
      
      Equipo MentorExpress
      ═══════════════════════════════════════════════════════════
    `);
  }
}
