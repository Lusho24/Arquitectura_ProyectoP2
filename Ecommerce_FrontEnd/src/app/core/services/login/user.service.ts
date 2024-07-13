import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPoint = `${environment.apiUrl}/users`;

  constructor(private http:HttpClient) { }

  public findAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(user: UserModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, user);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }
}
