import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common'
import { ReservationsService } from './reservations.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private service: ReservationsService) {}

  @Post()
  create(@Body() body, @Request() req) {
    return this.service.create({ ...body, userId: req.user.userId })
  }

  @Get()
  findAll(@Request() req) {
    return this.service.findAll(req.user.userId)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.service.remove(Number(id), req.user.userId)
  }
}
