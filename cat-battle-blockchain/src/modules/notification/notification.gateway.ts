import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TransactionFoundEvent } from '../account-subscriber/events/transaction-found.event';
import { OnEvent } from '@nestjs/event-emitter';
import { BscTransactionFoundEvent } from '../contract-subscriber/events/bsc-transaction-found.event';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('transaction.found')
  async push(tx: TransactionFoundEvent) {
    this.server.emit('transaction.found', tx);
  }

  @OnEvent('bsc.transaction.found')
  async bscTransactionFoundHandler(tx: BscTransactionFoundEvent) {
    this.server.emit('bsc.transaction.found', tx);
  }
}
