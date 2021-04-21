import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    public loaderService: LoaderService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    const userToken = localStorage.getItem('access_token');
    if(localStorage.getItem('access_token')) {
      console.log("Accesss Granted");
    const modifiedReq = req.clone({ 
      // headers: req.headers.set('Authorization', `Bearer ${userToken}`),
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+userToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
      })
    });
    console.log(modifiedReq);
    return next.handle(modifiedReq).pipe(
      finalize(
        () => {
          this.loaderService.isLoading.next(false);
        }
      )
    );
    } else {
      const modifiedReq = req.clone({ 
        // headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
        })
      });
      console.log(modifiedReq);
      return next.handle(modifiedReq);
    }
    
 
    
  }
}
