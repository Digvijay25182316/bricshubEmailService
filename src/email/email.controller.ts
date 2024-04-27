import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('send')
  @ApiOperation({ summary: 'Send an email' })
  async sendEmail(
    @Body('to') to: string,
    @Body('text') text: string,
  ): Promise<{ message: string }> {
    try {
      await this.emailService.sendEmail(to, 'BRICSHUB.AUDIT.SERVICE', text);
      return { message: 'Email sent successfully' }; // Return a success message
    } catch (error) {
      throw new HttpException(
        'Failed to send email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
