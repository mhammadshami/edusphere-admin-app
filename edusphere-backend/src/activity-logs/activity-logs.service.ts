import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ActivityLogsService {
  constructor(private prisma: PrismaService) {}

  log(userId: string, action: string) {
    return this.prisma.activityLog.create({
      data: {
        userId,
        action,
      },
    });
  }

  findAll() {
    return this.prisma.activityLog.findMany({
      include: { user: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
