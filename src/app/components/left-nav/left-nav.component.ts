import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterModule} from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-left-nav',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatMenuModule],
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.scss'
})
export class LeftNavComponent implements OnInit {
  profile:Profile;
  @Output() editProfile = new EventEmitter<number>();

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.storeService.profile$.subscribe((data)=> {
      this.profile = data[0];
    })
  }

  deconnect() {
    this.storeService.deconnect();
  }
}
