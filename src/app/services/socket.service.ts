import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:Socket;
  socketId: string = '';

  constructor() { }

  setSocket() {
    this.socket = io(environment.baseUrl.replace("/api", ''));
    this.socket.on('connect', () => {
      // this.socketId = this.socket.id;
      // let user:IUser|null = this.storeService.user$.getValue()[0];
      // this.socket.emit("client:user:setUserInfo", {
      //   id: user?._id,
      //   firstname: user?.firstname,
      //   lastname: user?.lastname
      // });
    });
  }
}
