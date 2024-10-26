import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppEnvironnement } from '../interfaces/enums';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  appEnv$ = new BehaviorSubject<(AppEnvironnement|null)[]>([null]);
  constructor() { }
}
