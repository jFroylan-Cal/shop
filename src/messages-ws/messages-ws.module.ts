import { Module } from '@nestjs/common';
import { MessagesWsGateway } from './messages-ws.gateway';
import { MessagesWsService } from './messages-ws.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AuthModule],
})
export class MessagesWsModule {}
