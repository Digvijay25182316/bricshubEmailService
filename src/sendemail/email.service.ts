import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST as string,
      port: process.env.NODEMAILER_PORT as unknown as number, // Assuming port is a number
      secure: false, // Set true if your SMTP server requires a secure connection
      auth: {
        user: process.env.NODEMAILER_USER as string,
        pass: process.env.NODEMAILER_PASS as string,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    attachments: Attachment[] = [],
  ): Promise<void> {
    try {
      console.log(this.transporter);
      await this.transporter.sendMail({
        from: process.env.SMTP_EMAIL as string,
        to,
        subject,
        html,
        attachments,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
