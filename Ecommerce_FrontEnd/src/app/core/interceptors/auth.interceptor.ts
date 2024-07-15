import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private urlUsers: string = environment.userUrl;
  private urlEcommerce: string = environment.ecommerceUrl;
  private tokenRequiredUrls: string[] = [
    this.urlUsers,
    this.urlEcommerce
  ];

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = request;

    if (localStorage.getItem('jwt') && this.isTokenRequired(request.url)) {
      const token = localStorage.getItem('jwt');

      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest);
  }

  // Método para verificar si el token es necesario para una URL específica
  private isTokenRequired(url: string): boolean {
    return this.tokenRequiredUrls.some(apiUrl => url.startsWith(apiUrl));
  }

}
