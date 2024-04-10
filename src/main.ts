import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configApp } from './core/config';
import { AppConfig } from './core/config/application';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configApp(app);
  const appConfig = app.get(AppConfig);
  const port = appConfig.getPort();
  const appUrl = appConfig.getAppUrl();

  await app.listen(port, () => console.log(`Server started ${appUrl}`));
}
bootstrap();
