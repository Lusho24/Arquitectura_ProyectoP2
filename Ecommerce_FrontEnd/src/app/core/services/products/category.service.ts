import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/models/products/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'https://localhost:44392/CategoryService.asmx';

  constructor(private http: HttpClient) { }

  addCategory(name: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:AddCategory>
            <ser:name>${name}</ser:name>
          </ser:AddCategory>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }

  updateCategory(id: number, name: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:UpdateCategory>
            <ser:id>${id}</ser:id>
            <ser:name>${name}</ser:name>
          </ser:UpdateCategory>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }

  getAllCategories(): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:GetAllCategories/>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response => this.extractCategories(response))
      );
  }

  getCategory(id: number): Observable<Category | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:GetCategory>
            <ser:id>${id}</ser:id>
          </ser:GetCategory>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response => this.extractCategory(response))
      );
  }

  deleteCategory(id: number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:DeleteCategory>
            <ser:id>${id}</ser:id>
          </ser:DeleteCategory>
        </soapenv:Body>
      </soapenv:Envelope>`;

    return this.http.post<string>(this.apiUrl, body, { headers, responseType: 'text' as 'json' });
  }

  private extractCategories(response: string): Category[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    
    const categories: Category[] = [];
    
    const categoryNodes = xmlDoc.getElementsByTagNameNS('http://tempuri.org/', 'GetAllCategoriesResult');
    
    if (categoryNodes.length > 0) {
      const categoryContent = categoryNodes[0]?.textContent || '';
      // Asegúrate de que el formato de tu XML esté siendo manejado correctamente aquí
      const categoryList = categoryContent.split('\n').filter(e => e.trim() !== '');
      
      categoryList.forEach(categoryString => {
        const categoryInfo = categoryString.split(', ').map(info => info.split(': ')[1]);
        const id = parseInt(categoryInfo[0], 10);
        const name = categoryInfo[1];
        
        categories.push({ IDCATEGORIA: id, NOMBRECATEGORIA: name });
      });
    }
    
    return categories;
  }

  private extractCategory(response: string): Category | null {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    
    const categoryNode = xmlDoc.getElementsByTagNameNS('http://tempuri.org/', 'GetCategoryResult')[0];
    
    if (categoryNode) {
      const categoryContent = categoryNode.textContent || '';
      // Asegúrate de que el formato de tu XML esté siendo manejado correctamente aquí
      const categoryInfo = categoryContent.split(', ').map(info => info.split(': ')[1]);
      const id = parseInt(categoryInfo[0], 10);
      const name = categoryInfo[1];
      
      return { IDCATEGORIA: id, NOMBRECATEGORIA: name };
    }
    
    return null;
  }
}
