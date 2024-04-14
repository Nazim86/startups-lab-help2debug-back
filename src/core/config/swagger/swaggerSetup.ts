import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { get } from 'http';

export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .addCookieAuth('refreshToken')
    .setTitle('Help2Debug backend')
    .setDescription('The Help2Debug API description')
    .setVersion('1.0')
    .addTag('Help2Debug')
    .addBearerAuth()
    .build();

  const serverUrl = 'http://127.0.0.1:5000';

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`swagger`, app, document);

  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
    });
  }
}
