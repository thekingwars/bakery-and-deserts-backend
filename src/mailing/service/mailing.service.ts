import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendClientMailStatusOne(
    to: string,
    subject: string,
    userName: string,
  ) {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'bakeryanddessertsmcbo@gmail.com', // sender address
        subject: subject, // Subject line
        template: 'action',
        context: {
          userName,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async sendEmailStatusTwo(
    to: string,
    subject: string,
    userName: string,
  ) {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'bakeryanddessertsmcbo@gmail.com', // sender address
        subject: subject, // Subject line
        template: 'status_two',
        context: {
          userName,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async sendEmailStatusThree(
    to: string,
    subject: string,
    userName: string,
  ) {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'bakeryanddessertsmcbo@gmail.com', // sender address
        subject: subject, // Subject line
        template: 'status_three',
        context: {
          userName,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async sendEmailStatusRejected(
    to: string,
    subject: string,
    userName: string,
  ) {
    this.mailerService
      .sendMail({
        to: to, // list of receivers
        from: 'bakeryanddessertsmcbo@gmail.com', // sender address
        subject: subject, // Subject line
        template: 'status_rejected',
        context: {
          userName,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async sendAdminEmail(context: any) {
    this.mailerService
      .sendMail({
        to: 'bakeryanddessertsmcbo@gmail.com',
        from: 'bakeryanddessertsmcbo@gmail.com', // list of receivers
        subject: 'Nuevo pedido', // Subject line
        template: 'admin',
        context,
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
