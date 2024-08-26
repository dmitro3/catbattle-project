import { CatBattleShop__factory } from '@cuonghx.ngen/cat-battle-contracts';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResilientWebsocketProviderService } from '../resilient-websocket-provider/resilient-websocket-provider.service';
import { BscTransactionFoundEvent } from './events/bsc-transaction-found.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ContractSubscriberService {
  private shopContractAddress = this.configService.get<string>(
    'BSC_SHOP_CONTRACT_ADDRESS',
  );

  constructor(
    private readonly configService: ConfigService,
    private readonly resilientWebsocketProviderService: ResilientWebsocketProviderService,
    private eventEmitter: EventEmitter2,
  ) {
    this.subscribe();
  }

  async subscribe() {
    const provider = await this.resilientWebsocketProviderService.connect();
    if (provider) {
      const contract = CatBattleShop__factory.connect(
        this.shopContractAddress,
        provider,
      );

      contract.on(contract.filters.ItemPurchased(), (payload: any) => {
        const { log, args } = payload;
        const transaction = new BscTransactionFoundEvent();
        transaction.hash = log.transactionHash;
        transaction.block = log.blockNumber;
        transaction.from = args[0];
        transaction.id = args[1].toString();
        transaction.name = args[2];
        transaction.price = args[3].toString();
        transaction.userId = args[4];

        this.eventEmitter.emit('bsc.transaction.found', transaction);
      });
    }
  }
}
