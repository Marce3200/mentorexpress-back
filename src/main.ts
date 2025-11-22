import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #fff }
      .swagger-ui .scheme-container { background: #1f1f1f }
      
      /* Tema oscuro completo */
      .swagger-ui { 
        background: #1f1f1f; 
        color: #fff;
      }
      
      .swagger-ui .info { 
        background: #2d2d2d; 
        color: #fff;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }
      
      .swagger-ui .info .title { 
        color: #61dafb; 
        font-size: 2.5em;
      }
      
      .swagger-ui .info .description { 
        color: #ccc; 
        font-size: 1.1em;
        line-height: 1.6;
      }
      
      .swagger-ui .opblock { 
        background: #2d2d2d; 
        border: 1px solid #444;
        border-radius: 6px;
        margin: 10px 0;
      }
      
      .swagger-ui .opblock .opblock-summary { 
        background: #3d3d3d;
        border-bottom: 1px solid #555;
      }
      
      .swagger-ui .opblock .opblock-summary-method { 
        background: #61dafb; 
        color: #1f1f1f;
        font-weight: bold;
      }
      
      .swagger-ui .opblock-summary-method.get { background: #49cc90; }
      .swagger-ui .opblock-summary-method.post { background: #fca130; }
      .swagger-ui .opblock-summary-method.put,
      .swagger-ui .opblock-summary-method.patch { background: #50e3c2; }
      .swagger-ui .opblock-summary-method.delete { background: #f93e3e; }
      
      .swagger-ui .opblock .opblock-summary-path { 
        color: #61dafb;
      }
      
      .swagger-ui .opblock .opblock-summary-description { 
        color: #ccc;
      }
      
      .swagger-ui .tab { 
        background: #2d2d2d; 
        color: #fff;
      }
      
      .swagger-ui .tab a { 
        color: #61dafb;
      }
      
      .swagger-ui .tab a:hover { 
        color: #fff;
      }
      
      .swagger-ui .response { 
        background: #2d2d2d; 
        border: 1px solid #444;
        border-radius: 6px;
      }
      
      .swagger-ui .response .response-col_status { 
        color: #49cc90;
      }
      
      .swagger-ui textarea, 
      .swagger-ui input[type="text"], 
      .swagger-ui input[type="email"], 
      .swagger-ui input[type="password"], 
      .swagger-ui input[type="search"], 
      .swagger-ui select { 
        background: #1f1f1f; 
        color: #fff; 
        border: 1px solid #555;
        border-radius: 4px;
      }
      
      .swagger-ui textarea:focus, 
      .swagger-ui input:focus { 
        border-color: #61dafb;
        box-shadow: 0 0 0 2px rgba(97, 218, 251, 0.2);
      }
      
      .swagger-ui .btn { 
        background: #61dafb; 
        color: #1f1f1f;
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        font-weight: bold;
      }
      
      .swagger-ui .btn:hover { 
        background: #21b4d6;
      }
      
      .swagger-ui .parameter__name { 
        color: #61dafb;
      }
      
      .swagger-ui .parameter__type { 
        color: #49cc90;
      }
      
      .swagger-ui .model { 
        background: #2d2d2d; 
        border: 1px solid #444;
        border-radius: 6px;
      }
      
      .swagger-ui .model-title { 
        background: #3d3d3d; 
        color: #61dafb;
        border-bottom: 1px solid #555;
        padding: 10px;
        border-radius: 6px 6px 0 0;
      }
      
      .swagger-ui .prop { 
        background: #2d2d2d;
      }
      
      .swagger-ui .prop.optional { 
        opacity: 0.7;
      }
      
      .swagger-ui .prop-name { 
        color: #61dafb;
      }
      
      .swagger-ui .prop-type { 
        color: #49cc90;
      }
      
      .swagger-ui .responses-inner { 
        background: #2d2d2d;
      }
      
      .swagger-ui .responses-header { 
        background: #3d3d3d;
        border-bottom: 1px solid #555;
      }
      
      /* Scrollbar personalizado */
      .swagger-ui ::-webkit-scrollbar { 
        width: 8px; 
      }
      
      .swagger-ui ::-webkit-scrollbar-track { 
        background: #2d2d2d; 
      }
      
      .swagger-ui ::-webkit-scrollbar-thumb { 
        background: #555; 
        border-radius: 4px;
      }
      
      .swagger-ui ::-webkit-scrollbar-thumb:hover { 
        background: #666; 
      }
    `,
    customSiteTitle: 'Mentoría API - Documentación',
    customfavIcon: '/favicon.ico',
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api`);
  console.log(`📖 HTML documentation: file://${process.cwd()}/docs/index.html`);
}
bootstrap();
