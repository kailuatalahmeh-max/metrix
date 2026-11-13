import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics() {
    const lastPayment = await this.prisma.payment.findFirst({
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const statistics = await this.prisma.workshop.aggregate({
      where: lastPayment
        ? {
            createdAt: {
              gt: lastPayment.createdAt,
            },
          }
        : undefined,
      _sum: {
        meters: true,
      },
      _count: {
        _all: true,
      },
    });

    const totalMeters = statistics._sum.meters?.toNumber() ?? 0;
    
    return {
      success: true,
      data: {
        totalMeters: totalMeters,
        workshopCount: statistics._count._all,
        lastPayment: lastPayment?.createdAt ?? null,
      },
    };
  }
}
