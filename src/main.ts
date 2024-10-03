import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
    app.setGlobalPrefix("api");
  
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })

    );

    const config = new DocumentBuilder()
    .setTitle('gest_pub_prod')
    .setDescription('gestion_product_pub')
    .setVersion('1.0') 
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

    const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000
  await app.listen(port);
  //console.log(`Aplicación escuchando en el puerto ${port}`);
}
bootstrap();
