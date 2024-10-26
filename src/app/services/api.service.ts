import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../components/login/login.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {

  constructor(private readonly http: HttpClient) { 
    super();
  }

  postLogin(data:ILogin): Observable<{token:string}> {
    return this.http.post<{token:string}>(`${this.baseUrl}/login`, JSON.stringify(data), this.getHttpOptionsAuth());
  }
}
