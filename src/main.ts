import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );
  const config = app.get(ConfigService);
  const port = config.get<number>('port');
  await app.listen(port || 3000);
}
bootstrap()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(`Application is running.`);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error starting the application:', err);
  });
