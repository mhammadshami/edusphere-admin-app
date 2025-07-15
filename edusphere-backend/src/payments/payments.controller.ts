import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/decorators/roles.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('STUDENT')
  @Post()
  create(@Body() dto: CreatePaymentDto, @CurrentUser() user: any) {
    return this.paymentsService.create(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('STUDENT')
  @Get('my')
  findMyPayments(@CurrentUser() user: any) {
    return this.paymentsService.findUserPayments(user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.paymentsService.confirm(id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
