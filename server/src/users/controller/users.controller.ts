import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { Request } from 'express';
import {
  ChangeProfile,
  ComparePasswordsData,
  CreateUserByAdmin,
  InputSendQuestion,
} from '../../base/types/userModels';
import { AuthService } from '../../auth/service/auth.service';
import { ChangeProfileUseCase } from '../use-cases/changeProfile.use-case';
import { UsersQueryRepository } from '../repositories/users.query-repository';
import { ApiTags } from '@nestjs/swagger';
import { EmailManager } from '../../base/helpers/emailManager';
import { favoriteNewsCategory } from '../../base/types/newsModels';
import { UserEntity } from '../domain/user.entity';
import { UsersRepository } from '../repositories/users.repository';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly changeProfileUseCase: ChangeProfileUseCase,
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly usersRepo: UsersRepository,
    private readonly emailManager: EmailManager,
  ) {}

  @Post('send-question')
  @HttpCode(204)
  async sendQuestion(@Body('inputData') inputData: InputSendQuestion) {
    return await this.emailManager.sendQuestion(
      inputData.name,
      inputData.location,
      inputData.text,
      inputData.email,
    );
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

  @Get()
  @HttpCode(200)
  async getAllUsersAdmin(
    @Query()
    query: {
      login_like: string;
      _sort: string;
      _order: 'asc' | 'desc';
      favoriteNewsCategory: favoriteNewsCategory;
      isConfirmed: string;
    },
  ) {
    let confirmed: boolean;
    let sortBy: 'ASC' | 'DESC';
    if (query.isConfirmed === 'true') {
      confirmed = true;
      if (!query._order) {
        sortBy = 'DESC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
          confirmed,
        );
      } else if (query._order === 'asc') {
        sortBy = 'ASC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
          confirmed,
        );
      } else {
        sortBy = 'DESC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
          confirmed,
        );
      }
    }
    if (query.isConfirmed === 'false') {
      confirmed = false;
      if (!query._order) {
        sortBy = 'DESC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
          confirmed,
        );
      } else if (query._order === 'asc') {
        sortBy = 'ASC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
          confirmed,
        );
      } else {
        sortBy = 'DESC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
          confirmed,
        );
      }
    } else {
      if (!query._order) {
        sortBy = 'DESC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
        );
      } else if (query._order === 'asc') {
        sortBy = 'ASC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
        );
      } else {
        sortBy = 'DESC';
        return await this.usersQueryRepository.getAllUsersAdmin(
          query.login_like,
          query._sort,
          sortBy,
          query.favoriteNewsCategory,
        );
      }
    }
  }

  @Get(':id')
  @HttpCode(200)
  async getByIdAdmin(@Param('id') id: string) {
    const user = await this.usersQueryRepository.getUserById(id);
    return {
      id: user?.id,
      login: user?.login,
      email: user?.email,
      location: user?.location,
      favoriteNewsCategory: user?.favoriteNewsCategory,
      isConfirmed: user?.isConfirmed,
      age: user?.age,
      createdAt: user?.createdAt.toDateString(),
    };
  }

  @Post()
  @HttpCode(201)
  async createByAdmin(@Body() data: CreateUserByAdmin) {
    const passwordHash = await this.authService.createPasswordHash(data.password);
    const user = UserEntity.createUserByAdmin(data, passwordHash);
    return await this.usersRepo.createUser(user);
  }

  @Patch(':id')
  @HttpCode(204)
  async updateByAdmin(@Param('id') id: string, @Body() data: CreateUserByAdmin) {
    return await this.usersRepo.updateUserByAdmin(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteById(@Param('id') id: string) {
    return await this.usersRepo.deleteById(id);
  }
}
