import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePaymetDto } from './dto/create-payment.dto.js';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePaymetDto) {
    return await this.prisma.payment.create({ data });
  }
}
