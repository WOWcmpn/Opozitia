import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { favoriteNewsCategory } from './newsModels';

export class ChangeProfile {
  @IsString()
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(3, 15)
  @IsOptional()
  login: string | null;

  @IsEmail()
  @IsOptional()
  email: string | null;

  @IsString()
  @Length(10, 25)
  @IsOptional()
  password: string | null;

  @IsDateString()
  @IsOptional()
  age: Date;

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
  @Matches('^[a-zA-Z0-9_-]*$')
  @Length(3, 15)
  login: string;

  @Length(10, 25)
  password: string;

  @Length(10, 25)
  confirmPassword: string;
}

export class InputConfirmationCode {
  @IsString()
  confirmationCode: string;
}

export class LoginUserModel {
  @IsEmail()
  email: string;

  @Length(10, 25)
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
