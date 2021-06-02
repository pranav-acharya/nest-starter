import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailConsumer } from './email-consumer';
import { NotificationService, QueueNames } from './notification.service';

@Module({
  imports: [
    BullModule.registerQueue({
        name: QueueNames.Email,
    }),
  ],
  controllers: [],
  providers: [NotificationService, EmailConsumer],
  exports: [NotificationService]
})
export class NotificationModule {}