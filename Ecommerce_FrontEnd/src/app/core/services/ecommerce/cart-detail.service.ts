import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartDetailModel } from '../../models/ecommerce/cartDetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  private urlEndPoint = `${environment.ecommerceUrl}/cart-detail`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<CartDetailModel[]> {
    return this.http.get<CartDetailModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<CartDetailModel> {
    return this.http.get<CartDetailModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(cartDetail: CartDetailModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, cartDetail);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }

}
