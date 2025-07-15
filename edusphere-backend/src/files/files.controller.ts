import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilesService } from './files.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/decorators/roles.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR', 'STUDENT')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ) {
    return this.filesService.saveFileData(
      file.originalname,
      file.path,
      user.userId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR', 'STUDENT')
  @Get('my')
  getMyFiles(@CurrentUser() user: any) {
    return this.filesService.getUserFiles(user.userId);
  }


   @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }
}
