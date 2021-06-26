import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { TokenBalance } from '../tokenBalance/tokenBalance.entity';
import { Coin } from '../../../coin/entity/coin.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contractAddress: string;

  @ManyToOne(() => Profile, (profile) => profile.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @ManyToOne(() => Coin, (coin) => coin.addressList, { eager: true })
  coin: Coin;

  @Column()
  coinBalance: string;

  @Column({ type: 'timestamp' })
  lastSync: Date;

  @OneToMany(() => TokenBalance, (tokenBalance) => tokenBalance.address)
  tokenBalances: TokenBalance[];
}
