import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Server is running http://localhost:${process.env.PORT}`);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
