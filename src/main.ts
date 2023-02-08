import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApiDocs } from 'config/api-docs';
import { SWAGGER_API_ROOT } from 'config/api-docs/constants';
import { CustomConfigService } from 'config/custom-config.service';
import { Logger } from '@nestjs/common';
import { loggerMiddleware } from 'bootstrap/middlewares';
import { HttpExceptionFilter } from 'bootstrap/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = app.get(CustomConfigService);
  const logger = new Logger();
  app.use(loggerMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());

  if (configService.NODE_ENV === 'local') {
    setupApiDocs(app);
    logger.log(
      `Browse your REST API at http://localhost:${configService.PORT}/${SWAGGER_API_ROOT}`,
      'Swagger',
    );
  }

  await app.listen(configService.PORT).then(() => {
    logger.log(`Server is running on port ${configService.PORT}`, 'Bootstrap');
  });
}

bootstrap();
