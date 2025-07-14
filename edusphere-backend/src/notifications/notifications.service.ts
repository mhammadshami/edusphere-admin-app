import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, content: string) {
    return this.prisma.notification.create({
      data: {
        userId,
        content,
      },
    });
  }

  markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
  }

  findUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
    });
  }
}
