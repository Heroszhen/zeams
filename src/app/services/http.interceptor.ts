import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { StoreService } from './store.service';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const storeService = inject(StoreService);
  storeService.loader$.next([true]);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error?.error?.message && error.error.message !== '') {
        storeService.openSnackBar(error.error.message);
      }

      console.error('HTTP error occurred:', error.error.message);
      if (error.status === 401) {
        console.error('Unauthorized access - redirecting to login');
      } 

      // Re-throw the error for further handling
      return throwError(() => error);
    }),
    finalize(() => {
      storeService.loader$.next([false]);
      
    })
    
  );
};
