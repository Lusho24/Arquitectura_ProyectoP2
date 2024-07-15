import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:44392/ProductService.asmx';

  constructor(private http: HttpClient) { }

  addProduct(categoryId: number, name: string, description: string, price: number, stock: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:AddProduct>
            <ser:categoryId>${categoryId}</ser:categoryId>
            <ser:name>${name}</ser:name>
            <ser:description>${description}</ser:description>
            <ser:price>${price}</ser:price>
            <ser:stock>${stock}</ser:stock>
          </ser:AddProduct>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }

  getProduct(id: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/GetProduct?id=${id}`);
  }

  updateProduct(id: number, categoryId: number, name: string, description: string, price: number, stock: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/UpdateProduct`, {
      id: id,
      categoryId: categoryId,
      name: name,
      description: description,
      price: price,
      stock: stock
    });
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/DeleteProduct?id=${id}`);
  }

  getAllProducts(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/GetAllProducts`);
  }
}
