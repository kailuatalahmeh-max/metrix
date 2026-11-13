import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service.js';
import { CreatePaymetDto } from './dto/create-payment.dto.js';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  create(
    @Body()
    body: CreatePaymetDto,
  ) {
    return this.paymentService.create(body);
  }
}
