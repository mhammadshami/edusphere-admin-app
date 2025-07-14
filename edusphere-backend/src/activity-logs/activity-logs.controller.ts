import { Controller, Get } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('activity-logs')
export class ActivityLogsController {
  constructor(private readonly activityLogs: ActivityLogsService) {}

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.activityLogs.findAll();
  }
}
