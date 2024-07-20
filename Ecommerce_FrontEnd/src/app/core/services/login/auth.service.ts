import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { RoleModel, UserModel } from '../../models/login/userModel';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = environment.authUrl;
  private currentUserKey = 'currentUser';

  private oAuthUrl = 'http://localhost:443/oauth2/authorization/google';

  constructor(
    private http: HttpClient,
    private router: Router) { }

  // * Método para iniciar sesion con google
  loginWithGoogle() {
    window.location.href = this.oAuthUrl;
  }

  handleAuthCallback(token: string) {
    localStorage.setItem('jwt', token);

    const auxUser: UserModel = this.getCurrentUser()!;
    const roles: RoleModel[] = auxUser?.roles!;

    const hasAdminRole = roles.some(role => role.name === 'ADMIN');
    const hasUserRole = roles.some(role => role.name === 'USER')

    if (hasAdminRole) {
      this.router.navigate(['/admin']);
    } else if (hasUserRole) {
      this.router.navigate(['/']);
    }

  }

  getToken() {
    return localStorage.getItem('jwt');
  }


  // * Método para iniciar sesion con formularios de login
  public login(user: UserModel): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, user)
      .pipe(
        tap(response => {
          const email = jwtDecode<JwtPayload>(response.token).sub;
          const decodedPayload = jwtDecode<UserModel>(response.token);
          const filteredPayload = {
            id: decodedPayload.id,
            name: decodedPayload.name,
            email: email,
            address: decodedPayload.address,
            phone: decodedPayload.phone,
            roles: decodedPayload.roles
          };
          localStorage.setItem('jwt', response.token);
          localStorage.setItem(this.currentUserKey, JSON.stringify(filteredPayload));
        })
      );
  }

  // Método para obtener el usuario actual
  public getCurrentUser(): UserModel | null {
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
