import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/userModel';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = environment.authUrl;
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) { }

  // Método para iniciar sesion
  public login(user: UserModel): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, user)
      .pipe(
        tap(response => {
          const decodedPayload = jwtDecode<JwtPayload>(response.token);
          localStorage.setItem('jwt', response.token);
          localStorage.setItem(this.currentUserKey, JSON.stringify(decodedPayload));
        })
      );
  }

  // Método para obtener el usuario actual
  public getCurrentUser(): UserModel | null | any{
    const userString = localStorage.getItem(this.currentUserKey);
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
  }

  // Método para cerrar sesión
  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem(this.currentUserKey);
  }

  // Método para comprobar si el usuario está autenticado
  public isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

}
