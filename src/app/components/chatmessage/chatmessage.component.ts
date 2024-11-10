import { Component, Input, OnDestroy, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Profile } from '../../models/profile';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { IInterlocutor } from '../../interfaces/interfaces';
import { Conversation } from '../../models/conversation';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-chatmessage',
  standalone: true,
  imports: [NgClass, NgIf, DatePipe, MatIconModule, MatMenuModule],
  templateUrl: './chatmessage.component.html',
  styleUrl: './chatmessage.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatmessageComponent implements OnInit, OnDestroy {
  profile:Profile;
  subscribers: Subscription[] = [];
  @Input() interlocutor: IInterlocutor;
  @Input() conversation: Conversation;
  @Input() messageType: string;
  @Input() dataIndex:number;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.subscribers.push(this.storeService.profile$.subscribe((data) => {
      this.profile = data[0];
    }));
  }

  ngOnDestroy() {
    for (let entry of this.subscribers) entry.unsubscribe();
  }
}
