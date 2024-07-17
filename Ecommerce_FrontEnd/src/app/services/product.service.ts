import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from 'src/app/model/productModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:44392/ProductService.asmx';

  constructor(private http: HttpClient) { }

  addProduct(categoryId: number, name: string, description: string, price: number, stock: number, imageUrl: string): Observable<string> {
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
            <ser:imageUrl>${imageUrl}</ser:imageUrl> <!-- Nuevo campo para la imagen -->
          </ser:AddProduct>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }

  updateProduct(id: number, categoryId: number, name: string, description: string, price: number, stock: number, imageUrl: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:UpdateProduct>
            <ser:id>${id}</ser:id>
            <ser:categoryId>${categoryId}</ser:categoryId>
            <ser:name>${name}</ser:name>
            <ser:description>${description}</ser:description>
            <ser:price>${price}</ser:price>
            <ser:stock>${stock}</ser:stock>
            <ser:imageUrl>${imageUrl}</ser:imageUrl> <!-- Nuevo campo para la imagen -->
          </ser:UpdateProduct>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }

  getAllProducts(): Observable<ProductModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:GetAllProducts/>
        </soapenv:Body>
      </soapenv:Envelope>`;
      
    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response => this.extractProducts(response))
      );
  }

  // Método para extraer los productos del XML de respuesta
  private extractProducts(response: string): ProductModel[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
  
    const products: ProductModel[] = [];
  
    const productNodes = xmlDoc.getElementsByTagNameNS('http://tempuri.org/', 'GetAllProductsResult');
  
    if (productNodes.length > 0) {
      const productContent = productNodes[0]?.textContent || '';
      const productList = productContent.split('\n').filter(e => e.trim() !== '');
    
      productList.forEach(productString => {
        const productInfo = productString.split(', ').map(info => info.split(': ')[1]);
        const id = parseInt(productInfo[0], 10);
        const name = productInfo[1];
        const description = productInfo[2];
        const price = parseFloat(productInfo[4]);
        const stock = parseInt(productInfo[5], 10);
    
        // categoryId se incluye en el objeto del producto (asumir que se obtiene del XML si es necesario)
        const categoryId = 0; // Asegúrate de obtener categoryId del XML si es necesario
        const imageUrl = productInfo[3]; // Asumiendo que el último valor es el URL de la imagen
        products.push({ id, categoryId, name, description, price, stock, imageUrl });
      });
    }
  
    return products;
  }

  deleteProduct(id: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:DeleteProduct>
            <ser:id>${id}</ser:id>
          </ser:DeleteProduct>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }
}
