import { EntityRepository, Repository } from 'typeorm';
import { Address } from './address.entity';
import { Profile } from '../profile/profile.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
