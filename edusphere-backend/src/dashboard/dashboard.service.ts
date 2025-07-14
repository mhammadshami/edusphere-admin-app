import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const usersCount = await this.prisma.user.count();
    const coursesCount = await this.prisma.course.count();
    const enrollmentsCount = await this.prisma.enrollment.count();
    const paymentsCount = await this.prisma.payment.count();
    const totalRevenue = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'CONFIRMED',
      },
    });

    return {
     usersCount ,
     coursesCount,
     enrollmentsCount,
     paymentsCount,
     totalRevenue: totalRevenue._sum.amount || 0
    }
  }
}
