import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetailModel } from '../../models/ecommerce/orderDetail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private urlEndPoint = `${environment.ecommerceUrl}/order-detail`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<OrderDetailModel[]> {
    return this.http.get<OrderDetailModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<OrderDetailModel> {
    return this.http.get<OrderDetailModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(orderDetail: OrderDetailModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, orderDetail);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }


}
