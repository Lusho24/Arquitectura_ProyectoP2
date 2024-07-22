import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentOrderModel } from '../../models/ecommerce/paymentOrder';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrderService {

  private urlEndPoint = `${environment.ecommerceUrl}/payment-order`;

  constructor(private http:HttpClient) { }

  public findAll(): Observable<PaymentOrderModel[]> {
    return this.http.get<PaymentOrderModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<PaymentOrderModel> {
    return this.http.get<PaymentOrderModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(paymentOrder: PaymentOrderModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, paymentOrder);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }

  public updateState(id: number, state: string): Observable<PaymentOrderModel> {
    const body = { state };
    return this.http.patch<PaymentOrderModel>(`${this.urlEndPoint}/${id}/state`,body);
  }

}
