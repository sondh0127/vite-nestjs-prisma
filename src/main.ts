import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function createApp() {
  const app = await NestFactory.create(AppModule);

  // 👇 binds ValidationPipe to the entire application
  app.useGlobalPipes(new ValidationPipe());

  // 👇 apply transform to all responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('NestJS Prisma Vite')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  return app;
}

if (import.meta.env.PROD) {
  async function bootstrap() {
    const app = await createApp();
    await app.listen(3000);
  }

  bootstrap();
}

export const viteNodeApp = createApp();
