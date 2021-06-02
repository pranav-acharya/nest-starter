import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from 'src/users/entities/user.entity';

export enum EmailJobTypes {
    Registration = "user-registration",
};

export const enum QueueNames {
    Email = "email",
}

@Injectable()
export class NotificationService {
    constructor(
        @InjectQueue(QueueNames.Email) private emailQueue: Queue
    ) {}

    async sendRegistrationNotification(user: User) {
        const job = await this.emailQueue.add(EmailJobTypes.Registration, user);
        console.log(job);
    }
}
