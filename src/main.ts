import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error starting the application:', err);
  });
