import { Controller, Get, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions-filter';

@Controller('test')
export class TestController {
  @Get('test')
  getTest() {
    throw new HttpException('Forbidden Resource', HttpStatus.FORBIDDEN);
  }
}
