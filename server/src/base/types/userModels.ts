import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';
import { favoriteNewsCategory } from './newsModels';
import { ApiProperty } from '@nestjs/swagger';

export class InputSendQuestion {
  name: string;
  location: string;
  text: string;
}

export class ComparePasswordsData {
  @IsString()
  password: string;

  @IsString()
  login: string;
}

export class CreateNewPassword {
  @IsString()
  @Length(5, 25)
  newPassword: string;

  @IsString()
  recoveryCode: string;
}

export class ChangePassword {
  @IsString()
  @Length(5, 25)
  newPassword: string;

  @IsString()
  login: string;
}

export class ResendConfirmation {
  @IsEmail()
  email: string;
}

export class ChangeProfile {
  @IsString()
  userId: string;

  @IsString()
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(3, 15)
  @IsOptional()
  login: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  age: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  location: string;

  @IsEnum(favoriteNewsCategory)
  @IsOptional()
  favoriteNewsCategory: favoriteNewsCategory;
}

export class InputUserModel {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 15)
  login: string;

  @Length(5, 25)
  password: string;

  @Length(5, 25)
  confirmPassword: string;
}

export class InputConfirmationCode {
  @IsString()
  confirmationCode: string;
}

export class LoginUserModel {
  @ApiProperty()
  // @IsEmail()
  email: string;

  @ApiProperty()
  // @Length(10, 25)
  password: string;
}

export class ViewUserModel {
  id: string;
  email: string;
  login: string;
  passwordHash: string;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: any;
  };
  recoveryConfirmation: {
    recoveryCode: string;
    expirationDate: any;
  };
  isConfirmed: boolean;
  createdAt: Date;
}

export class TokenModel {
  @ApiProperty()
  accessToken: string;
}
