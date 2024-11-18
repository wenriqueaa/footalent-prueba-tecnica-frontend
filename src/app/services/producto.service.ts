import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = '/api/productos'; // Ruta configurada en el proxy

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Crear un producto
  createProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }
}
