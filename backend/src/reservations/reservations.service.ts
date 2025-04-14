import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Reservation } from './reservations.entity'

@Injectable()
export class ReservationsService {
  constructor(@InjectRepository(Reservation) private repo: Repository<Reservation>) {}

  async create(reservation: Partial<Reservation>) {
    const start = new Date(reservation.date)
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

    const conflict = await this.repo.createQueryBuilder('reservation')
      .where('reservation.date BETWEEN :start AND :end', { start, end })
      .getOne()

    if (conflict) {
      throw new BadRequestException('Créneau déjà réservé')
    }

    return this.repo.save(this.repo.create(reservation))
  }

  findAll(userId: number) {
    return this.repo.find({ where: { userId } })
  }

  remove(id: number, userId: number) {
    return this.repo.delete({ id, userId })
  }
}
