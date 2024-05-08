import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { join } from 'path';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './httpExceptionFilter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({ credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors) => {
        const customErrors: any = [];

        errors.forEach((e) => {
          const constraintsKeys = Object.keys(e.constraints!);
          constraintsKeys.forEach((key) => {
            customErrors.push({
              message: e.constraints![key],
              field: e.property,
            });
          });
        });

        throw new BadRequestException(customErrors);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.set('view engine', 'ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'clientnext'));

  // app.useStaticAssets(join(__dirname, '..', 'clientnext'));

  await app.listen(4000);
}
bootstrap();
