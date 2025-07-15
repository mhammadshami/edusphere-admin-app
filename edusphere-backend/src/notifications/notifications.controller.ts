import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/decorators/roles.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':userId')
  create(@Param('userId') userId: string, @Body('content') content: string) {
    return this.notificationsService.create(userId, content);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'STUDENT', 'INSTRUCTOR')
  @Get('my')
  findMy(@CurrentUser() user: any) {
    return this.notificationsService.findUserNotifications(user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('STUDENT', 'INSTRUCTOR', 'ADMIN')
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }
}
