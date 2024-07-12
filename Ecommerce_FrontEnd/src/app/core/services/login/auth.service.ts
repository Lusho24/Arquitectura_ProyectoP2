import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/userModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = `${environment.apiUrl}/users`;

  constructor(private http:HttpClient) { }

  public findAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.urlEndPoint}/all`);
  }

}
