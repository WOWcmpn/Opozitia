import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { RegistrationUseCase } from '../use-cases/registration.use-case';
import { inputConfirmationCode, inputUserModel, loginUserModel } from '../../base/types/userModels';
import { ConfirmEmailUseCase } from '../use-cases/confirmEmail.use-case';
import { CheckCredentialsUseCase } from '../use-cases/checkCredentials.use-case';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { AuthWhiteListRepository } from '../repositories/authWhiteList.repository';
import { LogoutUseCase } from '../use-cases/logout.use-case';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { UsersQueryRepository } from '../../users/repositories/users.query-repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registrationUseCase: RegistrationUseCase,
    private readonly confirmEmailUseCase: ConfirmEmailUseCase,
    private readonly checkCredentialsUseCase: CheckCredentialsUseCase,
    private readonly authService: AuthService,
    private readonly authWhiteListRepository: AuthWhiteListRepository,
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('registration-password')
  @HttpCode(204)
  async registration(@Body() userModel: inputUserModel) {
    return await this.registrationUseCase.createUserForRegistration(userModel);
  }

  @Post('registration-code')
  @HttpCode(204)
  async confirmRegistrationCode(@Body() confirmationCode: inputConfirmationCode) {
    return await this.confirmEmailUseCase.confirmEmail(confirmationCode.confirmationCode);
  }

  @Post('login')
  @HttpCode(201)
  async login(@Body() inputData: loginUserModel, @Res() res: Response) {
    const user = await this.checkCredentialsUseCase.checkCredentials(inputData);
    const accessToken = await this.authService.createAccessToken(user.id);
    const refreshToken = await this.authService.createRefreshToken(user.id);
    await this.authWhiteListRepository.createToken(refreshToken, user.id);
    await this.authService.verifyToken(refreshToken);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    return res.send({ accessToken: accessToken });
  }

  @Post('logout')
  @UseGuards(RefreshTokenGuard)
  @HttpCode(204)
  async logout(@Req() request: Request, @Res() res: Response) {
    await this.logoutUseCase.logout(request.cookies.refreshToken);
    return res.clearCookie('refreshToken').sendStatus(204);
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async getProfile(@Req() req: Request) {
    const userId = await this.authService.getUserId(req.headers.authorization!.split(' ')[1]);
    return await this.usersQueryRepository.getUserProfile(userId);
  }
}
