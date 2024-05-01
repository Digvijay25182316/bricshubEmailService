import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Attachment } from 'nodemailer/lib/mailer';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('send')
  @ApiOperation({ summary: 'Send an email with file attachment' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to attach to the email',
        },
        to: {
          type: 'string',
          description: 'Recipient email address',
        },
      },
    },
  })
  async sendEmail(
    @UploadedFile() file: Express.Multer.File,
    @Body('to') to: string,
  ): Promise<{ message: string }> {
    try {
      const attachment: Attachment = {
        filename: file.originalname,
        content: file.buffer, // Assuming 'buffer' is available in Express.Multer.File
      };
      await this.emailService.sendEmail(
        to,
        'BRICSHUB.AUDIT.SERVICE',
        `<!DOCTYPE html>
        <html lang="en">
          <body
            style="
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            "
          >
            <div
              class="container"
              style="
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              "
            >
              <div>
                <h1 style="text-align: center; font-size: 40px">Audit Success</h1>
              </div>
              <img
                src="https://t3.ftcdn.net/jpg/04/29/32/58/360_F_429325800_ebRpU9D1PLTBC7yEzy3eg4CKtlkgced6.jpg"
                alt=""
                srcset=""
                style="width: 100vh"
              />
              <div style="padding: 20px">
                <span style="display: block; font-weight: bold; font-size: x-large"
                  >YOUR AUDIT IS SUCCESSFULLY SUBMITTED</span
                >
                <span>
                  Below is the attachment of your audit data please download whenever
                  needed
                </span>
              </div>
              <div
                style="
                  text-align: center;
                  padding-top: 20px;
                  color: #777777;
                  font-size: 12px;
                "
              >
                <p>
                  This email was sent by BricsHub Audit Services. Please do not reply to
                  this email.
                </p>
              </div>
            </div>
          </body>
        </html>
        
      `,
        [attachment],
      );
      return { message: 'Email sent successfully' }; // Return a success message
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
