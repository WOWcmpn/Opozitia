import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class inputUserModel {
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

export class inputConfirmationCode {
  @IsString()
  confirmationCode: string;
}

export class loginUserModel {
  @IsEmail()
  email: string;

  @Length(10, 25)
  password: string;
}

export class viewUserModel {
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
