import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './services/storage.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  basicRoutes = ['/login', '/signup'];
  loggedRoute = ['/me'];

  baseHeader: HttpHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json; charset=utf-8'
  });
  constructor(private storageService: StorageService) {}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.basicRoutes.some(endpoint => httpRequest.url.includes(endpoint))) {
      httpRequest = httpRequest.clone({
        headers: this.baseHeader.set('Authorization', environment.basic)
      });
      return next.handle(httpRequest);
    }
    else if (this.loggedRoute.some(endpoint => httpRequest.url.includes(endpoint))) {
      httpRequest = httpRequest.clone({
        headers: this.baseHeader.set('Authorization', `Bearer ${this.storageService.get('accessToken')}`)
      });
      return next.handle(httpRequest);
    }
    else {
      return next.handle(httpRequest);
    }
  }
}
