import { Module } from '@nestjs/common';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        service: process.env.EMAIL_SERVICE,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'superOpozitiaSecret',
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
