import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Token } from '../../../token/entity/token.entity';
import { Address } from '../address/address.entity';

@Entity()
export class TokenBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Token, (token) => token.balances, {
    onDelete: 'CASCADE',
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
}
