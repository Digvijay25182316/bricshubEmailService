import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setContact(
      'API Support',
      'http://www.exmaple.com/support',
      'support@example.com',
    )
    .setTitle('BRICSHUB SERVICES')
    .setDescription('These are the services used by bricshub')
    .setVersion('1.0')
    .addTag('email') // Add tags if you have multiple endpoints
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
