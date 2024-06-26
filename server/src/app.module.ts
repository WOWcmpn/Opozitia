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
import { CommentsModule } from './comments/comments.module';
import { CryptoModule } from './crypto/crypto.module';
import { CurrencyModule } from './currency/currency.module';
import { FootballModule } from './football/football.module';
import { DaysEventModule } from './days-event/days-event.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../clientnext'),
    // }),
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
    NewsModule,
    QuizModule,
    UsersModule,
    AuthModule,
    CommentsModule,
    CryptoModule,
    CurrencyModule,
    FootballModule,
    DaysEventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
