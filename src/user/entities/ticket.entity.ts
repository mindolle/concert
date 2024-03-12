import {
  //   Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Concert } from './concert.entity';
import { Seat } from './seat.entity';

@Entity({
  name: 'ticket',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  ticketId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.ticket, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.ticket, { nullable: false })
  @JoinColumn({ name: 'concertId' })
  concert: Concert;

  @OneToOne(() => Seat)
  @JoinColumn({ name: 'seatId' })
  seat: Seat;
}
