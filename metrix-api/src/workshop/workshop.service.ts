import { CreateWorkshopDto } from './dto/create-workshop.dto.js';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Workshop } from '../generated/prisma/client.js';

function toResponse(workshop: Workshop) {
  return { ...workshop, meters: workshop.meters.toNumber() };
}

@Injectable()
export class WorkshopService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateWorkshopDto) {
    const workshop = await this.prisma.workshop.create({ data });
    return toResponse(workshop);
  }

  async findAll() {
    const workshops = await this.prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return workshops.map(toResponse);
  }

  async deleteWorkshop(workshopId: number) {
    const workshop = await this.prisma.workshop.delete({
      where: { id: workshopId },
    });
    
    return toResponse(workshop);
  }
}
