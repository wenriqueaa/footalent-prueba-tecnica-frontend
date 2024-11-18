import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = "http://localhost:3000/api/productos"

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error desde el backend:', error); // Muestra el error en la consola
        return throwError(() => error); // Reenvía el error al componente
      })
    );    
  }

  // Crear un producto
  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto).pipe(
      catchError((error) => {
        console.error('Error desde el backend:', error); // Muestra el error en la consola
        return throwError(() => error); // Reenvía el error al componente
      })
    );    
  }

  // Delete un producto
  deleteProducto(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error desde el backend:', error); // Muestra el error en la consola
        return throwError(() => error); // Reenvía el error al componente
      })
    );    
  }

  // Buscar un producto por Id
  getProducto(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error desde el backend:', error); // Muestra el error en la consola
        return throwError(() => error); // Reenvía el error al componente
      })
    );    
  }
  // Crear un producto
  updateProducto(producto: any): Observable<any> {
    return this.http.put(this.apiUrl, producto).pipe(
      catchError((error) => {
        console.error('Error desde el backend:', error); // Muestra el error en la consola
        return throwError(() => error); // Reenvía el error al componente
      })
    );    
  }
}
