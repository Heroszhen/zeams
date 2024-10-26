import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppEnvironnement } from '../interfaces/enums';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  appEnv$ = new BehaviorSubject<(AppEnvironnement|null)[]>([null]);
  loader$ = new BehaviorSubject<boolean[]>([false]);

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string, duration: number = 2): void {
    duration *= 1000;
    this.snackBar.open(message, 'Close', {
      duration,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

  deconnect() {
    localStorage.removeItem('token');
  }
}
