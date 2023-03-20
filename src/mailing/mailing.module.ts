import { Module } from '@nestjs/common';
import { MailingService } from './service/mailing.service';

@Module({
  controllers: [],
  providers: [MailingService],
})
export class MailingModule {}
