import { Body, Controller, Get, HttpCode, Put, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { Request } from 'express';
import { ChangeProfile } from '../../base/types/userModels';
import { AuthService } from '../../auth/service/auth.service';
import { ChangeProfileUseCase } from '../use-cases/changeProfile.use-case';
import { UsersQueryRepository } from '../repositories/users.query-repository';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly changeProfileUseCase: ChangeProfileUseCase,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  async getProfile(@Req() req: Request) {
    const userId = await this.authService.getUserId(req.headers.authorization!.split(' ')[1]);
    return await this.usersQueryRepository.getUserProfile(userId);
  }

  @Put('profile/change-information')
  @UseGuards(AccessTokenGuard)
  @HttpCode(204)
  async changeProfile(@Req() req: Request, @Body() data: ChangeProfile) {
    const userId = await this.authService.getUserId(req.headers.authorization!.split(' ')[1]);
    return await this.changeProfileUseCase.changeInformation(userId, data);
  }
}
