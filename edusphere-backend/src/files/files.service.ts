import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async saveFileData(filename: string, path: string, userId: string) {
    return this.prisma.file.create({
      data: {
        userId,
        filename,
        path,
      },
    });
  }

  async getUserFiles(userId: string) {
    return this.prisma.file.findMany({
      where: {
        userId,
      },
    });
  }

  async deleteFile(id: string) {
    return this.prisma.file.delete({
      where: {
        id,
      },
    });
  }
}
