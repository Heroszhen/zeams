import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../components/login/login.component';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { IResponseInterlocutors } from '../interfaces/interfaces';

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

  getGetProfile(): Observable<{data:Profile}> {
    return this.http.get<{data:Profile}>(`${this.baseUrl}/users/profile`, this.getHttpOptionsAuth());
  }

  patchEditProfile(data:Profile): Observable<{data:Profile}> {
    return this.http.patch<{data:Profile}>(`${this.baseUrl}/users/profile`, JSON.stringify(data), this.getHttpOptionsAuth());
  }

  postEditProfilePhoto(data: FormData): Observable<{data:Profile}> {
    return this.http.post<{data:Profile}>(`${this.baseUrl}/users/profile/photo`, data, this.getHttpOptionsAuth(null, true));
  }

  getGetInterlocutors(): Observable<IResponseInterlocutors> {
    return this.http.get<IResponseInterlocutors>(`${this.baseUrl}/users/interlocutors`, this.getHttpOptionsAuth());
  }

  postAddConversation(data: FormData) {
    return this.http.post<{data:Profile}>(`${this.baseUrl}/conversations`, data, this.getHttpOptionsAuth(null, true));
  }
}
