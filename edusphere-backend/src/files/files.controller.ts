import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilesService } from './files.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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

  @Roles('ADMIN', 'INSTRUCTOR', 'STUDENT')
  @Get('my')
  getMyFiles(@CurrentUser() user: any) {
    return this.filesService.getUserFiles(user.userId);
  }


  @Roles('ADMIN')
  @Delete(':id')
  deleteFile(@Param('id') id: string) {
    return this.filesService.deleteFile(id);
  }
}
