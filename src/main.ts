import { NestFactory } from '@nestjs/core';
import { EmailModule } from './email/email.module';
import { setupSwagger } from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  setupSwagger(app); // Integrate Swagger with your app
  await app.listen(3000);
}
bootstrap();
