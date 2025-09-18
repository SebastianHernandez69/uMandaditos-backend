import { Socket } from 'socket.io';

export interface AuthenticatedSocket extends Socket {
  data: {
    uid?: string;
    [key: string]: any;
  };
}
