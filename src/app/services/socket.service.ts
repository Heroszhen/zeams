import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { StoreService } from './store.service';
import { IInterlocutor, IResponseConversation } from '../interfaces/interfaces';
import { Message } from '../models/message';
import { Conversation } from '../models/conversation';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:Socket;
  socketId: string = '';

  constructor(
    private readonly storeService: StoreService,
    private readonly electronService: ElectronService
  ) { }

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
    this.listenChatMessage();
  }

  listenProfile() {
    this.socket.on('server:user:sendProfile', (data:IInterlocutor) => {
      this.storeService.updateInterlocutor(data);
    });
  }

  sendChatMessage(data: IResponseConversation) {
    this.socket.emit("client:conversation:sendMessage", data);
  }

  listenChatMessage() {
    this.socket.on('server:conversation:sendMessage', (data:IResponseConversation) => {
      if(data.interlocutor)this.storeService.updateInterlocutor(data.interlocutor);
      this.storeService.addMessageInConversations(data.conversation);
      if (data.conversation.receiver === this.storeService.profile$.getValue()[0]._id) {
        let text = data.conversation.text === '' ? "Vous avec reçu des fichiers" : data.conversation.text;
        for(let entry of this.storeService.interlocutors$.getValue()) {
          if (entry._id === data.conversation.sender){
            this.electronService.notifyMessage(entry.name, text)
            break;
          }
        }
      }
    });
  }
}
