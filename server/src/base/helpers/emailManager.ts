import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailManager {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmailConfirmationCode(email: string, confirmationCode: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'Opozitia <dmitrybackenddev@gmail.com>',
      subject: 'Confirmation code',
      html:
        '<h1>Thanks for your registration</h1>' +
        `<p style="font-size: 18px;">To finish registration please enter cofirmation code: 
          <b>${confirmationCode}</b></p>`,
    });
  }

  async sendPasswordRecovery(email: string, recoveryCode: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'Opozitia <dmitrybackenddev@gmail.com>',
      subject: 'Recovery code',
      html:
        '<h1>Instruction to recover your password</h1>' +
        `<p style="font-size: 18px;">To recover your password enter the following code: 
          <b>${recoveryCode}</b></p>`,
    });
  }
}
