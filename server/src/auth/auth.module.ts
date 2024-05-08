import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { RegistrationUseCase } from './use-cases/registration.use-case';
import { EmailManager } from '../base/helpers/emailManager';
import { UsersRepository } from '../users/repositories/users.repository';
import { UsersQueryRepository } from '../users/repositories/users.query-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/domain/user.entity';
import { ConfirmEmailUseCase } from './use-cases/confirmEmail.use-case';
import { CheckCredentialsUseCase } from './use-cases/checkCredentials.use-case';
import { AuthBlackListEntity } from './domain/authBlackList.entity';
import { AuthWhiteListEntity } from './domain/authWhiteList.entity';
import { AuthWhiteListRepository } from './repositories/authWhiteList.repository';
import { AuthBlackListRepository } from './repositories/authBlackList.repository';
import { LogoutUseCase } from './use-cases/logout.use-case';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AuthBlackListEntity, AuthWhiteListEntity])],
  controllers: [AuthController],
  providers: [
    EmailManager,
    AuthService,
    RegistrationUseCase,
    ConfirmEmailUseCase,
    CheckCredentialsUseCase,
    LogoutUseCase,
    UsersRepository,
    UsersQueryRepository,
    AuthWhiteListRepository,
    AuthBlackListRepository,
    RefreshTokenGuard,
    AccessTokenGuard,
  ],
})
export class AuthModule {}
