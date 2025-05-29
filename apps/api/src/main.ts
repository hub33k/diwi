import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BaseConfig } from './modules/app-config/base-config.service';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    bodyParser: true,
    logger: new Logger(),
  });

  const baseConfig = app.get(BaseConfig);
  app.enableCors(baseConfig.corsOptions);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const port = baseConfig.port;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
