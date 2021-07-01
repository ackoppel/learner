import {
  InjectQueue,
  OnQueueActive,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { TOKEN_UPDATE_QUEUE } from '../../constants/constants';
import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from '../entity/token.repository';
import {
  UpdateTokenBalancePayload,
  UpdateTokenPricePayload,
  UpdateTokenQueueItem,
  UpdateTokenTaskType,
} from './tokenUpdateQueueItem.interface';
import { Job, Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { TokenBalanceRepository } from '../tokenBalance/entity/tokenBalance.repository';

@Processor(TOKEN_UPDATE_QUEUE)
export class TokenUpdateQueueTaskProcessor implements OnModuleInit {
  TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(TOKEN_UPDATE_QUEUE)
    private tokenUpdateQueue: Queue<UpdateTokenQueueItem>,
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    @InjectRepository(TokenBalanceRepository)
    private tokenBalanceRepository: TokenBalanceRepository,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.tokenUpdateQueue.pause();
      this.logger.warn('Pausing token update queue');
    } else {
      await this.tokenUpdateQueue.resume();
      this.logger.warn('Resuming token update queue');
    }
  }

  @OnQueueActive()
  onActive(job: Job<UpdateTokenQueueItem>) {
    this.logger.log(`Processing update with data ${JSON.stringify(job.data)}`);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error(error);
  }

  @Process(UpdateTokenTaskType.UpdateTokenPrice)
  async updateTokenPrice(job: Job<UpdateTokenQueueItem>) {
    const payload = job.data.payload as UpdateTokenPricePayload;
    await this.tokenRepository.updateTokenPrice(
      payload.tokenPrice,
      payload.coin,
    );
    return this.TASK_OK;
  }

  @Process(UpdateTokenTaskType.UpdateTokenBalance)
  async updateTokenBalance(job: Job<UpdateTokenQueueItem>) {
    const payload = job.data.payload as UpdateTokenBalancePayload;
    await this.tokenBalanceRepository.createOrUpdateBalance(
      payload.tokenBalance.address,
      payload.tokenBalance.token,
      payload.update,
    );
    return this.TASK_OK;
  }
}
