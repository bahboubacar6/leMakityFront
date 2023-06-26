import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes('login') || req.url.includes('register') || req.url.includes('proprietes')){ return next.handle(req) }//on passe sans envoyer le token

    if (LoginService.isTokenExpired()) return next.handle(req);

      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/json',
          'Accept'       : 'application/json',
          'Authorization': `${LoginService.getToken()}`,
        },
      });


      /**Retour de la requette */
    return next.handle(req)
      .pipe(
        tap((response) => {
        }),
        catchError(err => {
          if (err.status === 401 || err.status === 403 || err.status === 415) {
            window.localStorage.removeItem('token');
            console.log('error', err.error);
          }
          return of(err)
        })
      );
  }
}
