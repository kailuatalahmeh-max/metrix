import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto.js';
import { WorkshopService } from './workshop.service.js';

@Controller('workshop')
export class WorkshopController {
  constructor(private workshopService: WorkshopService) {}
  @Post('create-workshop')
  create(
    @Body()
    body: CreateWorkshopDto,
  ) {
    return this.workshopService.create(body);
  }

  @Get('get-all-workshops')
  findAll() {
    return this.workshopService.findAll();
  }

  @Delete('delete-workshop/:workshopId')
  delete(@Param('workshopId', ParseIntPipe) workshopId: number) {
    return this.workshopService.deleteWorkshop(workshopId);
  }
}
