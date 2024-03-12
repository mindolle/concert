import {
  Column,
  //   CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  //   OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Concert } from './concert.entity';
import { Ticket } from './ticket.entity';

@Entity({
  name: 'seat',
})
export class Seat {
  @PrimaryGeneratedColumn()
  seatId: number;

  @Column({ type: 'int', nullable: false })
  concertId: number;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'int', nullable: false })
  seatNum: number;

  @ManyToOne(() => Concert, (concert) => concert.seat, { nullable: false })
  @JoinColumn({ name: 'concertId' })
  concert: Concert;

  @OneToOne(() => Ticket)
  @JoinColumn({ name: 'seatId' })
  ticket: Ticket;
}
