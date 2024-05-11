import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { favoriteNewsCategory } from '../../base/types/newsModels';
import { add } from 'date-fns/add';
import { InputUserModel } from '../../base/types/userModels';
import { AuthWhiteListEntity } from '../../auth/domain/authWhiteList.entity';

export class EmailConfirmation {
  confirmationCode: string;
  expirationDate: Date;
}

export class RecoveryConfirmation {
  recoveryCode: string;
  expirationDate: Date;
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  age: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true, enum: favoriteNewsCategory })
  favoriteNewsCategory: favoriteNewsCategory;

  @Column({ type: 'jsonb' })
  emailConfirmation: EmailConfirmation;

  @Column({ type: 'jsonb' })
  recoveryConfirmation: RecoveryConfirmation;

  @Column()
  isConfirmed: boolean;

  @Column()
  createdAt: Date;

  @OneToMany(() => AuthWhiteListEntity, (aw) => aw.usersId)
  whiteTokens: AuthWhiteListEntity;

  static createUserFirstStep(userModel: InputUserModel, passwordHash: string) {
    const user = new UserEntity();
    const confirmationCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const recoveryCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');

    user.email = userModel.email;
    user.login = userModel.login;
    user.passwordHash = passwordHash;
    user.emailConfirmation = {
      confirmationCode: confirmationCode,
      expirationDate: add(new Date(), { minutes: 3 }),
    };
    user.recoveryConfirmation = {
      recoveryCode: recoveryCode,
      expirationDate: add(new Date(), { months: 100 }),
    };
    user.isConfirmed = false;
    user.createdAt = new Date();

    return user;
  }
}
