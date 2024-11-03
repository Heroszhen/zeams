import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { StoreService } from './store.service';
import { IInterlocutor } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:Socket;
  socketId: string = '';

  constructor(private readonly storeService: StoreService) { }

  setSocket() {
    this.socket = io(environment.baseUrl.replace("/api", ''));
    this.socket.on('connect', () => {
      this.socketId = this.socket.id;
      this.setProfile();
      this.setListeners();
    });
  }

  setProfile() {
    const profile = this.storeService.profile$.getValue()[0];
    this.socket.emit("client:user:setUserInfo", {profile: profile});
  }

  setListeners() {
    this.listenProfile();
  }

  listenProfile() {
    this.socket.on('server:user:sendProfile', (data:IInterlocutor) => {
      this.storeService.updateInterlocutor(data);
    });
  }

}
