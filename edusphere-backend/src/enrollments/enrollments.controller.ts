import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('STUDENT')
  @Post()
  enroll(@Body() dto: CreateEnrollmentDto, @CurrentUser() user: any) {
    return this.enrollmentsService.enroll(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('STUDENT')
  @Get('my')
  findMyEnrollments(@CurrentUser() user: any) {
    return this.enrollmentsService.findUserEnrollments(user.userId);
  }

  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.enrollmentsService.deleteEnrollment(id)
  }
}
