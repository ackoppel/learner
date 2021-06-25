import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TokenBalance } from '../../profile/enitity/tokenBalance/tokenBalance.entity';
import { Chain } from '../../coin/enum/chain';

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

  @Column({ type: 'enum', enum: Chain })
  chain: Chain;

  @Column()
  decimals: number;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ type: 'timestamp' })
  lastSync: Date;

  @OneToMany(() => TokenBalance, (balance) => balance.token, { nullable: true })
  balances: TokenBalance[];
}
