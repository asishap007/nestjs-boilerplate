import { Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer';
import * as Email from 'email-templates';
import * as config from 'config';
import * as Path from 'path';

@Injectable()
export class EmailService {
  emailer: any;
  constructor() {
    const transporter = Nodemailer.createTransport(config.emailConfig);
    this.emailer = new Email({
      transport: transporter,
      send: true,
      preview: false,
      views: {
        root: Path.resolve('dist', 'shared', 'emails'),
        options: {
          extension: 'ejs',
        },
      },
    });
  }

  async sendEmail(
    template: string,
    locals: any,
    subject: string,
    to: string[],
    from: string = 'asishap007@gmail.com',
  ): Promise<any> {
    this.emailer
      .send({
        template,
        message: {
          subject,
          from,
          to: to.toString(),
        },
        locals,
      })
      // tslint:disable-next-line: no-console
      .then(() => console.log('email has been sent!'));
  }
}
