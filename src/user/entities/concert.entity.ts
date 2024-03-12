import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Ticket } from './ticket.entity';
import { Seat } from './seat.entity';

@Entity({
  name: 'concert',
})
export class Concert {
  @PrimaryGeneratedColumn()
  concertId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.concert, { nullable: false })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket[];

  @OneToMany(() => Seat, (seat) => seat.concert, { nullable: false })
  @JoinColumn({ name: 'ticketId' })
  seat: Seat[];
}
