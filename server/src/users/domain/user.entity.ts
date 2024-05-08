import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { newsCategory } from '../../base/types/newsModels';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns/add';
import { inputUserModel } from '../../base/types/userModels';
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
  age: number;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true, enum: newsCategory })
  favoriteNewsCategory: newsCategory;

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

  static createUserFirstStep(userModel: inputUserModel, passwordHash: string) {
    const user = new UserEntity();

    user.email = userModel.email;
    user.login = userModel.login;
    user.passwordHash = passwordHash;
    user.emailConfirmation = {
      confirmationCode: uuidv4(),
      expirationDate: add(new Date(), { minutes: 3 }),
    };
    user.recoveryConfirmation = {
      recoveryCode: uuidv4(),
      expirationDate: add(new Date(), { months: 100 }),
    };
    user.isConfirmed = false;
    user.createdAt = new Date();

    return user;
  }
}
