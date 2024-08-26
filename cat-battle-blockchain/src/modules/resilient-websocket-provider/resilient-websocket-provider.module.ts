import { Module } from '@nestjs/common';
import { ResilientWebsocketProviderService } from './resilient-websocket-provider.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ResilientWebsocketProviderService],
  exports: [ResilientWebsocketProviderService],
})
export class ResilientWebsocketProviderModule {}
