import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UsersQueryRepository } from './repositories/users.query-repository';
import { AuthService } from '../auth/service/auth.service';
import { EmailManager } from '../base/helpers/emailManager';
import { AuthWhiteListEntity } from '../auth/domain/authWhiteList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AuthWhiteListEntity])],
  controllers: [UsersController],
  providers: [UsersRepository, UsersQueryRepository, AuthService, EmailManager],
})
export class UsersModule {}
