import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Logger } from "@nestjs/common";
import { Server } from "ws";
import { IncomingMessage } from "http";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "@airlab/shared/lib/auth/dto";
import { Message } from "@airlab/shared/lib/events/message";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly jwtService: JwtService) {
    console.log("EventsGateway")
  }

  private readonly logger = new Logger(EventsGateway.name);
  private readonly clients = new Map<number, Map<number, WebSocket>>();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("events")
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: "events", data: item })));
  }

  @SubscribeMessage("identity")
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  afterInit(server: Server) {
    this.logger.log(`WebSocket Initialized`);
  }

  sendGroupMessage(message: Message) {
    if (!this.clients.has(message.groupId)) {
      return;
    }
    const data = JSON.stringify(message);
    for (const client of this.clients.get(message.groupId).values()) {
      client.send(data);
    }
  }

  handleConnection(socket: WebSocket, message: IncomingMessage) {
    const re = new RegExp(`ws\\/(\\d+)\\?token=(.+)`);
    const [_, groupIdString, token] = message.url.match(re);
    const payload = this.jwtService.decode(token) as JwtPayloadDto;
    if (!payload) {
      this.logger.error(`Invalid authentication token: ${token}`);
      socket.close(1002, "Invalid authentication token");
      return;
    }
    const groupId = Number(groupIdString);
    (socket as any).groupId = groupId;
    (socket as any).userId = payload.userId;
    if (!this.clients.has(groupId)) {
      this.clients.set(groupId, new Map());
    }
    this.clients.get(groupId).set(payload.userId, socket);
    this.logger.log(`WebSocket Connected [groupId: ${groupId}, userId: ${payload.userId}]`);
  }

  handleDisconnect(socket: WebSocket) {
    const groupId = (socket as any).groupId;
    const userId = (socket as any).userId;
    if (this.clients.has(groupId)) {
      if (this.clients.get(groupId).has(userId)) {
        this.clients.get(groupId).delete(userId);
      }
    }
    this.logger.log(`WebSocket Disconnected [groupId: ${groupId}, userId: ${userId}]`);
  }
}
