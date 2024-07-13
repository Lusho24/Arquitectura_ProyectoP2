import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = environment.authUrl;

  constructor(private http: HttpClient) { }

  // Método para iniciar sesion
  public login(user: UserModel): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, user)
      .pipe(
        tap(response => {
          localStorage.setItem('jwt', response.token);
        })
      );
  }

  // Método para obtener el token
  getToken() {
    return localStorage.getItem('jwt');
  }

  // Método para cerrar sesión
  public logout(): void {
    localStorage.removeItem('jwt');
  }

}
