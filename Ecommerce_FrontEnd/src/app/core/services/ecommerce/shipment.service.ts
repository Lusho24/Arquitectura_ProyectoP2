import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShipmentModel } from '../../models/ecommerce/shipmentModel';
@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  private urlEndPoint = `${environment.ecommerceUrl}/shipment`;

  constructor(private http:HttpClient) { }

  public findAll(): Observable<ShipmentModel[]> {
    return this.http.get<ShipmentModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<ShipmentModel> {
    return this.http.get<ShipmentModel>(`${this.urlEndPoint}/${id}`);
  }

  public findByName(name: string): Observable<ShipmentModel> {
    return this.http.get<ShipmentModel>(`${this.urlEndPoint}/by-name/${name}`);
  }

}
