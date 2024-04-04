import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .addCookieAuth('refreshToken')
    .setTitle('Help2Debug backend')
    .setDescription('The Help2Debug API description')
    .setVersion('1.0')
    .addTag('Help2Debug')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`swagger`, app, document);
}
