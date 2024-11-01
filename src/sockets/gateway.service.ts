import { Injectable } from '@nestjs/common';
import { EmitMessageDto } from './dtos/emitMessageDto';

import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { errorLoggger, infoLoggger } from 'src/utility/logger';

@Injectable()
@WebSocketGateway({
  namespace: 'sockets',
  cors: {
    origin: '*',
  },
})
export class GatewayService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  //Server module Start here
  @WebSocketServer()
  server: Server;

  private onlineUsers = 0;

  // This method handles new connections
  handleConnection() {
    this.onlineUsers++;
    this.server.emit('onlineUsers', this.onlineUsers);
  }

  // This method handles disconnections
  handleDisconnect() {
    this.onlineUsers--;
    this.server.emit('onlineUsers', this.onlineUsers);
  }

  onModuleInit() {
    setTimeout(() => {
      if (this.server) {
        this.server.on('connection', (socket) => {
          infoLoggger(socket.id);
          infoLoggger('Connected');
        });
      } else {
        errorLoggger('WebSocketServer is not initialized.');
      }
    }, 5000);
  }
  // Subscribe the messages and add the data into DB
  // Here we use this function for check socket is connected or not
  @SubscribeMessage('Ping')
  onNewMessage() {
    infoLoggger('Welcome');
    this.server.emit('Pong', {
      msg: 'Ping',
      Body: {
        Message: 'Lets start Both end connected',
      },
    });
  }

  //This function helps to emit the event from anywhere in the repo.
  async emitSocketEventNotification(request: EmitMessageDto) {
    try {
      await this.server.emit(request.eventName, {
        message: request.message,
        body: request.data,
      });
      return 'Sent Successfully';
    } catch (error) {
      errorLoggger(error.message);
      throw error;
    }
  }

  getOnlineUsersCount(): number {
    return this.onlineUsers;
  }
}
