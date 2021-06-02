import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { User } from 'src/users/entities/user.entity';
import { EmailJobTypes, QueueNames } from './notification.service';


@Processor(QueueNames.Email)
export class EmailConsumer {
  private readonly logger = new Logger(EmailConsumer.name);

  @Process(EmailJobTypes.Registration)
  async sendRegistrationNotification(job: Job<unknown>) {
    this.logger.log(`processing ${JSON.stringify(job.data)}`);
    const response = await this.sendEmail(job.data as User);
    return response;
  }

  sendEmail(user: User) {
    return new Promise((resolve) => resolve(`Email sent to ${user.email}`))
  }
}