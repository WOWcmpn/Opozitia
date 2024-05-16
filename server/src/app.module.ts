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
import { dynamicImport } from './base/helpers/dymicImport';
import { NewsEntity } from './news/domain/news.entity';
import { UserEntity } from './users/domain/user.entity';

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

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
    dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () => ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: [
              {
                resource: NewsEntity,
                options: {
                  id: 'Новости',
                  sort: {
                    sortBy: 'createdAtDate',
                    direction: 'desc',
                  },
                  properties: {
                    title: {
                      description: 'Заголовок новости',
                    },
                    description: {
                      type: 'textarea',
                      description: 'Контент новости',
                      props: {
                        rows: 20,
                      },
                    },
                    imgUrl: {
                      description: 'Ссылка на превью картинку',
                    },
                    fullImgUrl: {
                      description: 'Ссылка на главную картинку',
                    },
                    category: {
                      availableValues: [
                        { value: 'Business', label: 'Бизнес' },
                        { value: 'Economy', label: 'Экономика' },
                        { value: 'Policy', label: 'Политика' },
                        { value: 'World', label: 'Мир' },
                      ],
                    },
                  },
                  listProperties: ['title', 'createdAtTime', 'viewDate', 'category'],
                  filterProperties: ['title', 'createdAtTime', 'viewDate', 'category'],
                  editProperties: [
                    'title',
                    'description',
                    'imgUrl',
                    'fullImgUrl',
                    'createdAtTime',
                    'createdAtDate',
                    'viewDate',
                    'category',
                    'quizVote',
                  ],
                  showProperties: [
                    'title',
                    'description',
                    'imgUrl',
                    'fullImgUrl',
                    'createdAtTime',
                    'viewDate',
                    'category',
                    'quizVote',
                  ],
                },
              },
              {
                resource: UserEntity,
                options: {
                  id: 'Пользователи',
                },
              },
            ],
          },
          // auth: {
          //   authenticate,
          //   cookieName: 'adminjs',
          //   cookiePassword: 'secret',
          // },
          // sessionOptions: {
          //   resave: true,
          //   saveUninitialized: true,
          //   secret: 'secret',
          // },
        }),
      }),
    ),
    NewsModule,
    QuizModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
