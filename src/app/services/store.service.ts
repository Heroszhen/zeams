import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppEnvironnement } from '../interfaces/enums';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profile } from '../models/profile';
import { IInterlocutor } from '../interfaces/interfaces';
import { Conversation } from '../models/conversation';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  appEnv$ = new BehaviorSubject<(AppEnvironnement|null)[]>([null]);
  loader$ = new BehaviorSubject<boolean[]>([false]);
  profile$ = new BehaviorSubject<Profile[]>([new Profile()]);
  interlocutors$ = new BehaviorSubject<IInterlocutor[]>([]);
  conversations$ = new BehaviorSubject<Conversation[]>([]);

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, duration: number = 2): void {
    duration *= 1000;
    this.snackBar.open(message, 'Close', {
      duration,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

  deconnect() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  updateInterlocutor(profile:IInterlocutor) {
    if(profile === null)return;

    let tab = this.interlocutors$.getValue();
    let checked = false;
    tab = tab.map((item:IInterlocutor) => { 
      if (profile._id === item._id) {
        checked = true;
        return {...item, name: profile.name, photo: profile.photo}
      }
      return item
    });
    if(!checked)tab = [...tab, profile];
    this.interlocutors$.next(tab);
  }

  addMessageInConversations(message:Conversation) {
    let tab = this.conversations$.getValue();
    this.conversations$.next([...tab, message]);
  }

  addOldMessagesInConversations(messages:Conversation[]) {
    let tab = this.conversations$.getValue();
    this.conversations$.next([...messages, ...tab]);
  }
}
