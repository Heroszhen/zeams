import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IInterlocutor } from '../../interfaces/interfaces';
import { sortArrayByCreated } from '../../services/utils.service';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Conversation } from '../../models/conversation';
import { Profile } from '../../models/profile';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { Message } from '../../models/message';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor, DatePipe, NgClass, NgxEditorModule, FormsModule, MatIconModule, MatTooltipModule, NgIf],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  interlocutors: IInterlocutor[] = [];
  indexCurrent: number = 0;
  conversations: Conversation[] = [];
  profile: Profile;
  editor: Editor;
  messageM!:Message;
  toolbar: Toolbar = [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    // [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    // ['link', 'image'],
    // or, set options for link:
    // [{ link: { showOpenInNewTab: false } }, 'image'],
    // ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear', 'indent', 'outdent'],
    ['superscript', 'subscript'],
    ['undo', 'redo'],
  ];
  colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];
  @ViewChild('btnInputFiles') btnInputFiles!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly storeService: StoreService,
    private readonly apiService: ApiService,
    private readonly cdRef: ChangeDetectorRef
  ) { 
  }

  ngOnInit(): void {
    this.storeService.profile$.subscribe((data:Profile[]) => {
      this.profile = data[0];
    });
    if (this.profile._id !== null) {
      this.storeService.interlocutors$.subscribe((data:IInterlocutor[]) => {
        this.interlocutors = sortArrayByCreated(data, 'desc');
        this.cdRef.markForCheck();
      });
  
      this.storeService.conversations$.subscribe((data:Conversation[]) => {
        this.conversations = data;
      });

      this.resetMessageM();
      this.editor = new Editor();
    }
  }

  getLastDate(id:string): string | null {
    for(let i = this.conversations.length - 1; i >= 0; i--) {
      if ([this.conversations[i].receiver, this.conversations[i].sender].includes(id)) {
        return this.conversations[i].created;
      }
    }
    return null;
  }

  resetMessageM() {
    if (this.interlocutors.length === 0)return;
    this.messageM = new Message();
    this.messageM.sender = this.profile._id;
    this.messageM.receiver = this.interlocutors[this.indexCurrent]._id;
  }

  handleInputFiles(event: Event) {
    const files = (event.target as HTMLInputElement)?.files;
    for(let i = 0; i < files.length; i++) {
      if(this.messageM.files.length < 5)this.messageM.files.push(files.item(i));
      else break;
    }
  }

  sendMessage() {
    if (["", '<p></p>'].includes(this.messageM.text) && this.messageM.files.length === 0) return;

    let formD = new FormData();
    formD.append("text", this.messageM.text);
    formD.append("sender", this.messageM.sender);
    formD.append("receiver", this.messageM.receiver);
    for(let entry of this.messageM.files)formD.append("files", entry);
    this.apiService.postAddConversation(formD).subscribe({
      next: (data)=>{
       
       },
       error:(err)=>{}
    });
  }
}
