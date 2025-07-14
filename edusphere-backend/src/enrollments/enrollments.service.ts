import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: string, dto: CreateEnrollmentDto) {
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId: dto.courseId,
      },
    });
  }

  findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        course: true,
        user: true,
      },
    });
  }

  findUserEnrollments(userId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });
  }

  deleteEnrollment(id: string) {
    return this.prisma.enrollment.delete({
      where: {
        id,
      },
    });
  }
}
