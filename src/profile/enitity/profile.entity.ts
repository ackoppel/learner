import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderType } from '../enum/gender';
import { AuthCredentials } from '../../auth/entity/auth-credentials.entity';
import { Address } from '../../coin/address/entity/address.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  profileId: string;

  @Column()
  displayName: string;

  @Column({ length: 2000, default: '' })
  description: string;

  @Column({ type: 'enum', enum: GenderType, default: GenderType.NOT_PUBLIC })
  gender: GenderType;

  @OneToOne(() => AuthCredentials, { eager: true })
  @JoinColumn()
  authCredentials: AuthCredentials;

  @OneToMany(() => Address, (address) => address.profile, {
    nullable: true,
  })
  addresses: Address[];
}
