import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCourseDto, userId: string) {
    return this.prisma.course.create({
      data: {
        title: dto.title,
        description: dto.description,
        instructorId: userId,
      },
    });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: {
        instructor: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        instructor: true,
      },
    });
  }

  update(id: string, updateDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: {
        id,
      },
      data: updateDto,
    });
  }

  remove(id: string) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
