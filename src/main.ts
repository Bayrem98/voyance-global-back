import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  app.use(json({ limit: '100mb' })); // pour le corps de la demande JSON
  app.use(urlencoded({ limit: '100mb', extended: true })); // pour le corps de la demande codé en URL
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
