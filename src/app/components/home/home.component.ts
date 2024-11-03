import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { IInterlocutor } from '../../interfaces/interfaces';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly storeService: StoreService,
    private readonly router: Router,
    private readonly socketService: SocketService
  ) {
    setTimeout(() => {
      this.router.navigate(["/chat"]);
    }, 1000);
  }

  ngOnInit() {
    setTimeout(() => {
      this.getProfile();
    }, 500);
  }

  getProfile() {
    this.apiService.getGetProfile().subscribe({
      next: (data)=>{
        this.storeService.profile$.next([data.data]);
        this.socketService.setSocket();
        this.getDatas();
      },
    });
  }

  getDatas() {
    this.apiService.getGetInterlocutors().subscribe({
      next: (data)=>{
        this.storeService.interlocutors$.next(data.interlocutors);
        this.storeService.conversations$.next(data.conversations);
      },
    });
  }
}
