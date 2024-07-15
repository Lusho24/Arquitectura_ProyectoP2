import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../../models/cartModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private urlEndPoint = `${environment.ecommerceUrl}/cart`;

  constructor(private http:HttpClient) { }

  public findAll(): Observable<CartModel[]> {
    return this.http.get<CartModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<CartModel> {
    return this.http.get<CartModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(cart: CartModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, cart);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }

  public findByUserId(id: string): Observable<CartModel> {
    return this.http.get<CartModel>(`${this.urlEndPoint}/by-user-id/${id}`);
  }

}
