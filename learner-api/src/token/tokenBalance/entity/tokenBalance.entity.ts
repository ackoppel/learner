import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from '../../entity/token.entity';
import { Address } from '../../../coin/address/entity/address.entity';

@Entity()
export class TokenBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Token, (token) => token.balances, {
    onDelete: 'CASCADE',
    eager: true,
  })
  token: Token;

  @ManyToOne(() => Address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: Address;

  @Column()
  balance: string;

  @Column({ type: 'timestamp' })
  lastSync: Date;

  @Column({ type: 'timestamp', default: new Date() })
  dateAdded: Date;
}
