import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service.js';

@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}
  @Get()
  getStatistics() {
    return this.statisticsService.getStatistics();
  }
}
