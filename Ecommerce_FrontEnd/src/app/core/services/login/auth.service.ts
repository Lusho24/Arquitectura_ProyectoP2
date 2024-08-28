import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { RoleModel, UserModel } from '../../models/login/userModel';
import { Router } from '@angular/router';
import { CartService } from '../ecommerce/cart.service';
import { CartModel } from '../../models/ecommerce/cartModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = environment.authUrl;
  private currentUserKey = 'currentUser';

  private oAuthUrl = 'https://auth-token-service-api-lg37rfueiq-rj.a.run.app/oauth2/authorization/google';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService ) { }

  // * Método para iniciar sesion con google
  loginWithGoogle() {
    window.location.href = this.oAuthUrl;
  }

  handleAuthCallback(token: string) {
    this.decodeToken(token);

    const auxUser: UserModel | null = this.getCurrentUser();
    if (auxUser && auxUser.id) {
      const roles: RoleModel[] = auxUser.roles || [];

      const hasAdminRole = roles.some(role => role.name === 'ADMIN');
      const hasUserRole = roles.some(role => role.name === 'USER');

      // Crear un carrito para el usuario autenticado
      this.createCartForUser(auxUser.id);

      if (hasAdminRole) {
        this.router.navigate(['/admin']);
      } else if (hasUserRole) {
        this.router.navigate(['/']);
      }
    } else {
      console.error('El usuario o el ID del usuario es nulo o indefinido.');
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
          this.decodeToken(response.token);
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

  // Metodo para decodificar el token
  private decodeToken(token: string) {
    const email = jwtDecode<JwtPayload>(token).sub;
    const decodedPayload = jwtDecode<UserModel>(token);
    const filteredPayload = {
      id: decodedPayload.id,
      name: decodedPayload.name,
      email: email,
      address: decodedPayload.address,
      phone: decodedPayload.phone,
      roles: decodedPayload.roles,
      idTienda: decodedPayload.idTienda
    };
    localStorage.setItem('jwt', token);
    localStorage.setItem(this.currentUserKey, JSON.stringify(filteredPayload));
  }

  // Metodo para devolver roles:
  public getRoles(): RoleModel[] | null {
    if (this.getCurrentUser()) {
      const auxUser: UserModel = this.getCurrentUser()!;
      const roles: RoleModel[] = auxUser?.roles!;
      return roles;
    }
    return null
  }

  // Método para crear un carrito para el usuario
  private createCartForUser(userId: string): void {
    const newCart: CartModel = {
      userId: userId,
      creationDate: new Date(),
      total: 0.00
    };

    this.cartService.save(newCart).subscribe({
      next: () => {
        console.log("Carrito creado exitosamente para el usuario con ID:", userId);
      },
      error: (error) => {
        console.error("Error al crear el carrito: ", error);
      }
    });
  }
}

