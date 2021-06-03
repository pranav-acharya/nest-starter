import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { createBullBoard } from 'bull-board';
const { BullAdapter } = require('bull-board/bullAdapter')
const Queue = require('bull')
const { BullMQAdapter } = require('bull-board/bullMQAdapter')
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
export class NotificationModule {
    // https://stackoverflow.com/questions/63271404/nestjs-connect-bull-board-in-a-normal-controller
    configure(consumer: MiddlewareConsumer): void {
        const result = createBullBoard([]);
        result.setQueues([new BullAdapter(new Queue(QueueNames.Email))])
        consumer
          .apply(result.router)
          .forRoutes('/admin/queues');
      }
}