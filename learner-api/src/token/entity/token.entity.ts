import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TokenBalance } from '../tokenBalance/entity/tokenBalance.entity';
import { Coin } from '../../coin/entity/coin.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  address: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  priceInCoin: string;

  @ManyToOne(() => Coin, (coin) => coin, { eager: true })
  coin: Coin;

  @Column()
  decimals: number;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: 'timestamp' })
  lastSync: Date;

  @OneToMany(() => TokenBalance, (balance) => balance.token, { nullable: true })
  balances: TokenBalance[];
}
