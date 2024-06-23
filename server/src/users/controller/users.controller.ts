import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { Request } from 'express';
import { ChangeProfile, ComparePasswordsData, InputSendQuestion } from '../../base/types/userModels';
import { AuthService } from '../../auth/service/auth.service';
import { ChangeProfileUseCase } from '../use-cases/changeProfile.use-case';
import { UsersQueryRepository } from '../repositories/users.query-repository';
import { ApiTags } from '@nestjs/swagger';
import { EmailManager } from '../../base/helpers/emailManager';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly changeProfileUseCase: ChangeProfileUseCase,
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly emailManager: EmailManager,
  ) {}

  @Post('send-question')
  @HttpCode(204)
  async sendQuestion(@Body('inputData') inputData: InputSendQuestion) {
    return await this.emailManager.sendQuestion(inputData.name, inputData.location, inputData.text);
  }

  @Get('profile-login')
  @HttpCode(200)
  async getProfileInfo(@Query() query: { login: string }) {
    return await this.usersQueryRepository.getUserProfileByLogin(query.login);
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async getProfile(@Req() req: Request) {
    const userId = await this.authService.getUserId(req.headers.authorization!.split(' ')[1]);
    return await this.usersQueryRepository.getUserProfile(userId);
  }

  @Put('profile/change-information')
  @HttpCode(204)
  async changeProfile(@Body() data: ChangeProfile) {
    await this.changeProfileUseCase.changeInformation(data);
    return true;
  }

  @Post('compare-passwords')
  @HttpCode(204)
  async comparePasswords(@Body() data: ComparePasswordsData) {
    const user = await this.usersQueryRepository.getUserByLogin(data.login);
    if (!user) throw new BadRequestException([{ message: 'Это не ваш пароль', field: 'password' }]);
    const isTrue = await this.authService.comparePasswords(data.password, user.passwordHash);
    if (isTrue) {
      return true;
    } else {
      throw new BadRequestException([{ message: 'Это не ваш пароль', field: 'password' }]);
    }
  }
}
