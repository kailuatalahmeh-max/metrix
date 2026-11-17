import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto.js';
import { WorkshopService } from './workshop.service.js';

@Controller('workshop')
export class WorkshopController {
  constructor(private workshopService: WorkshopService) {}
  @Post()
  create(
    @Body()
    body: CreateWorkshopDto,
  ) {
    return this.workshopService.create(body);
  }

  @Get()
  findAll() {
    return this.workshopService.findAll();
  }

  @Delete('/:workshopId')
  delete(@Param('workshopId', ParseIntPipe) workshopId: number) {
    return this.workshopService.deleteWorkshop(workshopId);
  }
}
