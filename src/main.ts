import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://voyance-global.vercel.app',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  });
  app.use(bodyParser.json({ limit: '50mb' })); // Augmentez la limite selon vos besoins
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
