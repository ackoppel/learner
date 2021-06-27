import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Chain } from '../enum/chain';
import { Address } from '../../profile/address/entity/address.entity';
import { Token } from '../../token/entity/token.entity';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Chain })
  name: Chain;

  @Column()
  priceUsd: string;

  @Column()
  decimals: number;

  @Column({ type: 'timestamp', nullable: true })
  lastSync: Date;

  @OneToMany(() => Address, (address) => address.coin)
  addressList: Address[];

  @OneToMany(() => Token, (token) => token.coin)
  tokenList: Token[];
}
