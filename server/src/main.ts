import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';

// pour la mise en place de Swagger => https://docs.nestjs.com/openapi/introduction#bootstrap
// pour la sécu avec Bearer auth => https://docs.nestjs.com/openapi/security#bearer-authentication

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000, // 1 heure
      },
    }),
  )

  app.enableCors({
    origin: 'https://moviebooker-qs.netlify.app', // ton frontend 'http://localhost:5173', 
    credentials: true,              // important pour les cookies
  });
  

  const config = new DocumentBuilder()
    .setTitle('MovieBooker')
    .setDescription('Plateforme de reservation de séance cinéma')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
