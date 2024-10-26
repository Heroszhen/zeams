import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {
    setTimeout(() => {
      this.router.navigate(["/chat"]);
    }, 5000);
  }
}
