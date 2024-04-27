import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'recipient@example.com',
  })
  to: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Hello from NestJS!',
  })
  subject: string;

  @ApiProperty({
    description: 'Email message body',
    example: 'This is a test email sent from NestJS.',
  })
  message: string;
}
