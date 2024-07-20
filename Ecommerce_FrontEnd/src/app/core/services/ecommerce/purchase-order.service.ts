import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PurchaseOrderModel } from '../../models/ecommerce/purchaseOrder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private urlEndPoint = `${environment.ecommerceUrl}/purchase-order`;

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PurchaseOrderModel[]> {
    return this.http.get<PurchaseOrderModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<PurchaseOrderModel> {
    return this.http.get<PurchaseOrderModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(purchaseOrder: PurchaseOrderModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, purchaseOrder);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }

  public updateProductQuantity(id: number, state: string): Observable<PurchaseOrderModel> {
    const body = { state };
    return this.http.patch<PurchaseOrderModel>(`${this.urlEndPoint}/${id}/state`,body);
  }

}
