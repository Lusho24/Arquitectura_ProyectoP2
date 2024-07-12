import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = environment.authUrl;
  

  constructor(private http:HttpClient) { }

  public login(user: UserModel): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, user);
  }

}
