import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { QuizModule } from './quiz/quiz.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { dynamicImport } from './base/helpers/dymicImport';
// import { NewsEntity } from './news/domain/news.entity';
// import { UserEntity } from './users/domain/user.entity';
import { CommentsModule } from './comments/comments.module';
// import { CommentsEntity } from './comments/domain/comments.entity';
import { CryptoModule } from './crypto/crypto.module';
import { CurrencyModule } from './currency/currency.module';
import { FootballModule } from './football/football.module';

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
//
// const DEFAULT_ADMIN = {
//   email: 'admin@example.com',
//   password: 'password',
// };
//
// const authenticate = async (email: string, password: string) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../clientnext'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-little-hat-a5brmjlw.us-east-2.aws.neon.tech',
      port: 5432,
      username: 'pilyak003',
      password: '4XeKmwaybIR3',
      database: 'NewsDb',
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
      // logging: ['query'],
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'dmitrybackenddev@gmail.com',
          pass: 'tzcjafbdsjqrpmwl',
        },
        service: 'gmail',
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET || '123',
    }),
    ScheduleModule.forRoot(),
    // dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
    //   AdminModule.createAdminAsync({
    //     useFactory: () => ({
    //       adminJsOptions: {
    //         rootPath: '/admin',
    //         branding: {
    //           companyName: 'Opozitia-admin',
    //           logo: 'http://localhost:5000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.56f8f5c2.png&w=640&q=75',
    //         },
    //         resources: [
    //           {
    //             resource: NewsEntity,
    //             options: {
    //               // id: 'Новости',
    //               navigation: {
    //                 name: null,
    //               },
    //               sort: {
    //                 sortBy: 'createdAtDate',
    //                 direction: 'desc',
    //               },
    //               properties: {
    //                 title: {
    //                   description: 'Заголовок новости',
    //                 },
    //                 description: {
    //                   type: 'textarea',
    //                   description: 'Контент новости',
    //                   props: {
    //                     rows: 20,
    //                   },
    //                 },
    //                 imgUrl: {
    //                   description: 'Ссылка на превью картинку',
    //                 },
    //                 fullImgUrl: {
    //                   description: 'Ссылка на главную картинку',
    //                 },
    //                 category: {
    //                   availableValues: [
    //                     { value: 'Business', label: 'Бизнес' },
    //                     { value: 'Economy', label: 'Экономика' },
    //                     { value: 'Policy', label: 'Политика' },
    //                     { value: 'World', label: 'Мир' },
    //                   ],
    //                 },
    //                 createdAtDate: {
    //                   description: 'Выберите дату публикации новости в календаре',
    //                 },
    //                 createdAtTime: {
    //                   description: 'Напишите время в следующем виде - "11:20"',
    //                 },
    //                 viewDate: {
    //                   description: 'Напишите дату в следующем виде - "07 мая 2024"',
    //                 },
    //               },
    //               listProperties: ['title', 'createdAtTime', 'viewDate', 'category'],
    //               filterProperties: ['title', 'createdAtTime', 'viewDate', 'category'],
    //               editProperties: [
    //                 'title',
    //                 'description',
    //                 'imgUrl',
    //                 'fullImgUrl',
    //                 'category',
    //                 'createdAtDate',
    //                 'createdAtTime',
    //                 'viewDate',
    //               ],
    //               showProperties: [
    //                 'title',
    //                 'description',
    //                 'imgUrl',
    //                 'fullImgUrl',
    //                 'createdAtTime',
    //                 'viewDate',
    //                 'category',
    //                 'quizVote',
    //               ],
    //             },
    //           },
    //           {
    //             resource: UserEntity,
    //             options: {
    //               // id: 'Пользователи',
    //               sort: {
    //                 sortBy: 'createdAt',
    //                 direction: 'desc',
    //               },
    //               navigation: {
    //                 name: null,
    //               },
    //               properties: {
    //                 emailConfirmation: {
    //                   type: 'mixed',
    //                 },
    //                 'emailConfirmation.confirmationCode': {
    //                   type: 'string',
    //                 },
    //                 'emailConfirmation.expirationDate': {
    //                   type: 'date',
    //                 },
    //                 recoveryConfirmation: {
    //                   type: 'mixed',
    //                 },
    //                 'recoveryConfirmation.confirmationCode': {
    //                   type: 'string',
    //                 },
    //                 'recoveryConfirmation.expirationDate': {
    //                   type: 'date',
    //                 },
    //               },
    //               listProperties: [
    //                 'email',
    //                 'login',
    //                 'age',
    //                 'location',
    //                 'favoriteNewsCategory',
    //                 'createdAt',
    //                 'isConfirmed',
    //               ],
    //               filterProperties: ['age', 'login', 'location'],
    //               editProperties: [
    //                 'email',
    //                 'login',
    //                 'age',
    //                 'location',
    //                 'favoriteNewsCategory',
    //                 'isConfirmed',
    //               ],
    //               showProperties: [
    //                 'email',
    //                 'login',
    //                 'age',
    //                 'location',
    //                 'favoriteNewsCategory',
    //                 'emailConfirmation',
    //                 'recoveryConfirmation',
    //                 'createdAt',
    //                 'isConfirmed',
    //               ],
    //             },
    //           },
    //           {
    //             resource: CommentsEntity,
    //             options: {
    //               // id: 'Комментарии',
    //               sort: {
    //                 sortBy: 'createdAt',
    //                 direction: 'desc',
    //               },
    //               navigation: {
    //                 name: null,
    //               },
    //               listProperties: ['username', 'text', 'createdAt'],
    //               showProperties: ['username', 'userId', 'newsId', 'text', 'createdAt'],
    //               editProperties: ['text'],
    //               filterProperties: ['username', 'newsId', 'createdAt'],
    //             },
    //           },
    //         ],
    //       },
    //       auth: {
    //         authenticate,
    //         cookieName: 'adminjs',
    //         cookiePassword: 'secret',
    //       },
    //       sessionOptions: {
    //         resave: true,
    //         saveUninitialized: true,
    //         secret: 'secret',
    //       },
    //     }),
    //   }),
    // ),
    NewsModule,
    QuizModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    CryptoModule,
    CurrencyModule,
    FootballModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
