import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { darkModeCss } from './darkModeCss.js';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Configuración de Swagger con tema oscuro
  const config = new DocumentBuilder()
    .setTitle('Mentoría API')
    .setDescription('API para sistema de mentoría académica')
    .setVersion('1.0')
    .addTag('students', 'Operaciones relacionadas con estudiantes')
    .addTag('mentors', 'Operaciones relacionadas con mentores')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: darkModeCss,
    customSiteTitle: 'Mentoría API - Documentación',
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📚 Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
  console.log(`📖 HTML documentation: file://${process.cwd()}/docs/index.html`);
}
bootstrap();
