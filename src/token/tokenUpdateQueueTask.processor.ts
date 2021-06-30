import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { TOKEN_UPDATE_QUEUE } from '../constants/constants';
import { Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from './entity/token.repository';
import {
  UpdateTokenQueueItem,
  UpdateTokenTaskType,
} from './tokenUpdateQueueItem.interface';
import { Job, Queue } from 'bull';
import { ConnectorTokenPrice } from '../externalApi/model/tokenPrice.connector';
import { ConfigService } from '@nestjs/config';

@Processor(TOKEN_UPDATE_QUEUE)
export class TokenUpdateQueueTaskProcessor implements OnModuleInit {
  TASK_OK = 'Ok';
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    @InjectQueue(TOKEN_UPDATE_QUEUE)
    private tokenUpdateQueue: Queue<UpdateTokenQueueItem>,
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (!this.configService.get<boolean>('sync.enabled')) {
      await this.tokenUpdateQueue.pause();
    } else {
      await this.tokenUpdateQueue.resume();
    }
  }

  @OnQueueActive()
  onActive(job: Job<UpdateTokenQueueItem>) {
    this.logger.log(`Processing update with data ${JSON.stringify(job.data)}`);
  }

  @Process(UpdateTokenTaskType.UpdateTokenPrice)
  async updateTokenPrice(job: Job<UpdateTokenQueueItem>) {
    const tokenPrice = job.data.payload as ConnectorTokenPrice;
    await this.tokenRepository.updateTokenPrice(tokenPrice, job.data.coin);
    return this.TASK_OK;
  }
}
