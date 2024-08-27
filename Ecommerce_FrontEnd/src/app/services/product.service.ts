import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from 'src/app/model/productModel';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:44392/ProductService.asmx';

  constructor(private http: HttpClient) { }

  addProduct(categoryId: number, storeId: number, name: string, description: string, price: number, stock: number, imageUrl: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
  
    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:AddProduct>
            <ser:categoryId>${categoryId}</ser:categoryId>
            <ser:storeId>${storeId}</ser:storeId> <!-- Nuevo campo para IDTIENDA -->
            <ser:name>${name}</ser:name>
            <ser:description>${description}</ser:description>
            <ser:price>${price}</ser:price>
            <ser:stock>${stock}</ser:stock>
            <ser:imageUrl>${imageUrl}</ser:imageUrl>
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


  

  getProduct(id: number): Observable<ProductModel | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
  
    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:GetProduct>
            <ser:id>${id}</ser:id>
          </ser:GetProduct>
        </soapenv:Body>
      </soapenv:Envelope>`;
  
    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response => this.extractProduct(response))  // Ensure extractProduct returns ProductModel
      );
  }
  updateProductStock(productId: number, newStock: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
  
    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:UpdateProductStock>
            <ser:productId>${productId}</ser:productId>
            <ser:newStock>${newStock}</ser:newStock>
          </ser:UpdateProductStock>
        </soapenv:Body>
      </soapenv:Envelope>`;
  
    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' })
      .pipe(
        catchError(error => {
          console.error('Error en updateProductStock:', error);
          return throwError(() => new Error('Error al actualizar el stock del producto.'));
        })
      );
  }
  getProductsByStore(storeId: number): Observable<ProductModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });
  
    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:FindProductbyIdStore>
            <ser:storeId>${storeId}</ser:storeId>
          </ser:FindProductbyIdStore>
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
        const categoryId = parseInt(productInfo[6]);
        const storeId = parseInt(productInfo[7]); // Nuevo campo para IDTIENDA
        const imageUrl = productInfo[3];
        
        products.push({ id, categoryId, storeId, name, description, price, stock, imageUrl });
      });
    }
  
    return products;
  }
  
  private extractProduct(response: string): ProductModel | null {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    
    const productNode = xmlDoc.getElementsByTagNameNS('http://tempuri.org/', 'GetProductResult')[0];
    
    if (productNode) {
      const productContent = productNode.textContent || '';
      const productInfo = productContent.split(', ').map(info => info.split(': ')[1]);
      const id = parseInt(productInfo[0], 10);
      const name = productInfo[1];
      const description = productInfo[2];
      const price = parseFloat(productInfo[4]);
      const stock = parseInt(productInfo[5], 10);
      const categoryId = parseInt(productInfo[6]);
      const storeId = parseInt(productInfo[7]); // Nuevo campo para IDTIENDA
      const imageUrl = productInfo[3];
      
      return { id, categoryId, storeId, name, description, price, stock, imageUrl };
    }
  
    return null;
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
