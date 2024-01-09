import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://voyance-global.vercel.app',
    },
  });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
