import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        userId,
        amount: dto.amount,
        courseId: dto.courseId,
      },
    });
  }

  findAll() {
    return this.prisma.payment.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  }

  findUserPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      include: { course: true },
    });
  }

  confirm(id: string) {
    return this.prisma.payment.update({
      where: { id },
      data: {
        status: 'CONFIRMED',
      },
    });
  }

  remove(id: string) {
    return this.prisma.payment.delete({
      where: {
        id,
      },
    });
  }
}
