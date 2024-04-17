import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  headers: HttpHeaders = new HttpHeaders;
  private apiUrl = `${environment.apiUrl}/categoria`;

  constructor(private http: HttpClient) { }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoriaById(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  // createCategoria(categoria: FormData): Observable<Categoria> {
  //   return this.http.post<Categoria>(this.apiUrl, categoria);
  // }

  // createCategoria(formData: any): Observable<any> {
  //   const formDataWithImage = new FormData();
  //   Object.keys(formData).forEach((key) => {
  //     formDataWithImage.append(key, formData[key]);
  //   });
  //   console.log('FormData con imagen:', formDataWithImage)
    
  //   return this.http.post(
  //     `${this.apiUrl}/`,
  //     formDataWithImage
  //   );
  // }
  
  

  updateCategoria(id: string, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  deleteCategoria(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
