import { EntityRepository, Repository } from 'typeorm';
import { TokenBalance } from './tokenBalance.entity';

@EntityRepository(TokenBalance)
export class TokenBalanceRepository extends Repository<TokenBalance> {}
