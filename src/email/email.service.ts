import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST, // Your SMTP server host
      port: process.env.NODEMAILER_PORT, // Your SMTP port
      secure: false, // Set true if your SMTP server requires a secure connection
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    console.log(this.transporter);
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_EMAIL, // Sender address
        to,
        subject,
        text,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
