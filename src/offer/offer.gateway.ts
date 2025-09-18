import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FirebaseService } from 'src/firebase/firebase.service';
import { AuthenticatedSocket } from 'src/common/types/authenticated-socket';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/realtime',
})
export class OfferGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly firebase: FirebaseService) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const raw =
        (client.handshake.auth?.token as string | undefined) ??
        (client.handshake.query?.token as string | undefined);

      if (!raw) {
        client.emit('error', { message: 'Missing token' });
        return client.disconnect(true);
      }

      const match = raw.match(/^Bearer\s+(.+)$/i);
      const idToken = (match ? match[1] : raw).trim();

      const decoded = await this.firebase.getAuth().verifyIdToken(idToken);
      const uid = decoded.uid;
      if (!uid) {
        client.emit('error', { message: 'Invalid token (no uid)' });
        return client.disconnect(true);
      }

      client.data.uid = uid;
      await client.join(`user:${uid}`);

      client.emit('connected', { ok: true, uid });
    } catch (e) {
      client.emit('error', { message: 'Invalid or expired token' });
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: AuthenticatedSocket) {
    // Limpieza opcional
    // p.ej. logging: console.log(`WS disconnected: ${client.id} (uid=${client.data.uid})`);
  }

  emitToUser(uid: string, event: string, data: any) {
    this.server.to(`user:${uid}`).emit(event, data);
  }

  emitToUsers(uids: string[], event: string, data: any) {
    if (!uids?.length) return;
    const rooms = uids.map((u) => `user:${u}`);
    this.server.to(rooms).emit(event, data);
  }
}
