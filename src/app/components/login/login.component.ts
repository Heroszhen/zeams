import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

export interface ILogin {
  email:string,
  password: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginM:ILogin = {
    email: "",
    password: ""
  }
  hidden:boolean = true;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {
    if(![null, ''].includes(localStorage.getItem('token'))) {
      this.router.navigate(["/accueil"]);
    }
  }

  resetLoginM(): ILogin{
    return this.loginM = {
      email: "",
      password: ""
    }
  }

  sendLogin() {
    this.apiService.postLogin(this.loginM).subscribe({
      next: (data)=>{
       localStorage.setItem('token', data['token']);
       this.router.navigate(["/accueil"]);
      },
      error:(err)=>{}
    });
  }
}
