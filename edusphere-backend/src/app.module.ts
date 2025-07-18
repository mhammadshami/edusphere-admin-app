import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { TestModule } from './test/test.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [UsersModule, AuthModule, CoursesModule, EnrollmentsModule, PaymentsModule, NotificationsModule, ActivityLogsModule, DashboardModule, TestModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
