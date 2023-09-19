import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }
    this.wss.emit(
      'client-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: any) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'client-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    //Send to one client
    // client.emit('messages-from-server',{
    //   fullName: 'yo',
    //   message: payload.message || 'no-message'
    // })

    //! Send to all clients, but not who send the message
    // client.broadcast.emit('messages-from-server',{
    //   fullName: 'yo',
    //   message: payload.message || 'no-message'
    // })

    //! Send all clients
    this.wss.emit('messages-from-server', {
      fullName: this.messagesWsService.getUserFullNameBySocketId(client.id),
      message: payload.message || 'no-message',
    });
  }
}
