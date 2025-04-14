import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  movieTitle: string

  @Column()
  date: Date

  @Column()
  userId: number
}
