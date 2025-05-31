import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 

  app.enableCors();
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 4000;

 // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de DinosDevs')
    .setDescription('Documentación de la API del proyecto DinosDves')
    .setVersion('1.0')
    .addBearerAuth()//para que aparezca el botón "Authorize" y brindar token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La ruta será /api



  await app.listen(PORT);
  console.log(`🚀Server running on http://localhost:${PORT}`);
}
bootstrap();
