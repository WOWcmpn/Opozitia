import { BadRequestException, Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegistrationUseCase } from '../use-cases/registration.use-case';
import {
  ChangePassword,
  CreateNewPassword,
  InputConfirmationCode,
  InputUserModel,
  LoginUserModel,
  ResendConfirmation,
  TokenModel,
} from '../../base/types/userModels';
import { ConfirmEmailUseCase } from '../use-cases/confirmEmail.use-case';
import { CheckCredentialsUseCase } from '../use-cases/checkCredentials.use-case';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { AuthWhiteListRepository } from '../repositories/authWhiteList.repository';
import { LogoutUseCase } from '../use-cases/logout.use-case';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { PasswordRecoveryUseCase } from '../use-cases/passwordRecovery.use-case';
import { NewPasswordUseCase } from '../use-cases/newPassword.use-case';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersRepository } from '../../users/repositories/users.repository';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly registrationUseCase: RegistrationUseCase,
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
    private readonly checkCredentialsUseCase: CheckCredentialsUseCase,
    private readonly authService: AuthService,
    private readonly authWhiteListRepository: AuthWhiteListRepository,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly passwordRecoveryUseCase: PasswordRecoveryUseCase,
    private readonly newPasswordUseCase: NewPasswordUseCase,
    private readonly usersRepo: UsersRepository,
    private readonly usersQueryRepo: UsersQueryRepository,
  ) {}

  @Post('registration-password')
  @HttpCode(201)
  async registration(@Body() userModel: InputUserModel) {
    return await this.registrationUseCase.createUserForRegistration(userModel);
  }

  @Post('registration-code')
  @HttpCode(204)
  async confirmRegistrationCode(@Body() confirmationCode: InputConfirmationCode) {
    return await this.confirmEmailUseCase.confirmEmail(confirmationCode.confirmationCode);
  }

  @Post('password-recovery')
  @HttpCode(201)
  async passwordRecovery(@Body() data: ResendConfirmation) {
    return await this.passwordRecoveryUseCase.sendCode(data.email);
  }

  @Post('new-password')
  @HttpCode(204)
  async newPassword(@Body() data: CreateNewPassword) {
    return await this.newPasswordUseCase.createNewPassword(data.newPassword, data.recoveryCode);
  }

  @Post('change-password')
  @HttpCode(204)
  async changePassword(@Body() data: ChangePassword) {
    const user = await this.usersQueryRepo.getUserByLogin(data.login);
    if (!user) throw new BadRequestException([{ message: "User doesn't exists", field: 'Login' }]);
    const passwordHash = await this.authService.createPasswordHash(data.newPassword);
    await this.usersRepo.updatePassword(user.id, passwordHash);
    return;
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'Success', type: TokenModel })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Login user' })
  @ApiConsumes('multipart/form-data', 'string')
  @ApiBody({ type: LoginUserModel })
  @HttpCode(200)
  async login(@Body() inputData: LoginUserModel, @Res() res: Response) {
    const user = await this.checkCredentialsUseCase.checkCredentials(inputData);
    const accessToken = await this.authService.createAccessToken(user.id);
    const refreshToken = await this.authService.createRefreshToken(user.id);
    await this.authWhiteListRepository.createToken(refreshToken, user.id);
    await this.authService.verifyToken(refreshToken);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    return res.send({
      accessToken: accessToken,
      login: user.login,
      email: user.email,
      location: user.location,
      id: user.id,
      favoriteNewsCategory: user.favoriteNewsCategory,
      age: user.age,
    });
  }

  @Post('logout')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(204)
  async logout(@Req() request: Request, @Res() res: Response) {
    await this.logoutUseCase.logout(request.cookies.refreshToken);
    return res.clearCookie('refreshToken').sendStatus(204);
  }
}
