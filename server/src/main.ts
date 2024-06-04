import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { HttpExceptionFilter } from './httpExceptionFilter';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { dynamicImport } from './base/helpers/dymicImport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder().setTitle('Новостной портал').setVersion('1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({ credentials: true, origin: true });
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

  // const adminJSModule = await dynamicImport('adminjs');
  // const AdminJS = adminJSModule.default;
  // const AdminJSTypeorm = await dynamicImport('@adminjs/typeorm');
  // AdminJSTypeorm.Resource.validate = validate;
  // AdminJS.registerAdapter({
  //   Resource: AdminJSTypeorm.Resource,
  //   Database: AdminJSTypeorm.Database, // Change with whatever adapter you want to use
  // });

  await app.listen(4000);
  Logger.log(`🚀 Application is running on: http://localhost:4000`);
}
bootstrap();
