import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:9000';  // Reemplaza con la URL de tu servidor FastAPI

  constructor(private http: HttpClient) {}

  uploadImage(name: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.apiUrl}/upload/`, formData);
  }

  deleteImage(fileId: string, fileName: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${fileId}/${fileName}`);
  }
}
