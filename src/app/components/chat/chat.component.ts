import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IInterlocutor } from '../../interfaces/interfaces';
import { sortArrayByCreated } from '../../services/utils.service';
import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Conversation } from '../../models/conversation';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, DatePipe, NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  interlocutors: IInterlocutor[] = [];
  indexCurrent: number = 0;
  allConversations: Conversation[] = [];
  conversations: Conversation[] = [];
  profile: Profile;

  constructor(
    private readonly storeService: StoreService
  ) { 
  }

  ngOnInit(): void {
    this.storeService.profile$.subscribe((data:Profile[]) => {
      this.profile = data[0];
    });
    if (this.profile._id !== null) {
      this.storeService.interlocutors$.subscribe((data:IInterlocutor[]) => {
        this.interlocutors = sortArrayByCreated(data, 'desc');
      });
  
      this.storeService.conversations$.subscribe((data:Conversation[]) => {
        this.allConversations = sortArrayByCreated(data, 'asc');
        this.conversations = [];
        for(let item of this.allConversations) {
          if ([item.sender, item.receiver].includes(this.interlocutors[this.indexCurrent]._id)) {
            this.conversations.push(item);
          }
        }
      });
    }
  }

  getLastDate(id:string): string | null {console.log(id)
    for(let i = this.allConversations.length - 1; i >= 0; i--) {
      if ([this.allConversations[i].receiver, this.allConversations[i].sender].includes(id)) {
        return this.allConversations[i].created;
      }
    }
    return null;
  }
}
