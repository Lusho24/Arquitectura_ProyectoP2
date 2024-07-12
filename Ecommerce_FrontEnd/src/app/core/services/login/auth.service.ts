import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdGFseW5mcmFuMDA3QGdtYWlsLmNvbSIsImlhdCI6MTcyMDgxNzMyNSwiZXhwIjoxNzIwOTAzNzI1fQ.P-xWRkZnvWxC1rimJpFljQC9ivePnske4i9v030Bz9Mr7iEKjREOuRUuvEYIjm0t`
    });
    
    return this.http.get<UserModel[]>(`${this.urlEndPoint}/all`, { headers });
  }

}
