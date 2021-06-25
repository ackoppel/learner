import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Chain } from '../enum/chain';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Chain })
  name: Chain;

  @Column()
  priceUsd: string;

  @Column({ type: 'timestamp', nullable: true })
  lastSync: Date;
}
