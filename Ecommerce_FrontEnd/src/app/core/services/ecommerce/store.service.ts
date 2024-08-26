import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreModel } from '../../models/ecommerce/storeModel';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private urlEndPoint = `${environment.ecommerceUrl}/store`;

  constructor(private http:HttpClient) { }

  public findAll(): Observable<StoreModel[]> {
    return this.http.get<StoreModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<StoreModel> {
    return this.http.get<StoreModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(store: StoreModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, store);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }
  
}
