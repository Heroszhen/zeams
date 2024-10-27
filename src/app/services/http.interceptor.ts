import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { StoreService } from './store.service';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storeService = inject(StoreService);
  storeService.loader$.next([true]);

  return next(req).pipe(
    tap((event) => {
      if (
        !req.url.includes('login') &&
        ['POST', 'PATCH'].includes(req.method) &&
        event instanceof HttpResponse && 
        [200, 201].includes(event.status)
      ) {
        const body = (event.body as {data:any, message: string});
        if (body.message)storeService.openSnackBar(body.message);
        else storeService.openSnackBar("Enregistrer");
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error?.error?.message && error.error.message !== '') {
        storeService.openSnackBar(error.error.message);
      }
      
      if (error.status === 401) {//unauthenticated
        //empty all and go to login page
        //router.navigate(["/connexion"]);
      } 

      // Re-throw the error for further handling
      return throwError(() => error);
    }),
    finalize(() => {
      storeService.loader$.next([false]);
    })
    
  );
};
