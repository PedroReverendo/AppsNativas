import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // Cambia esta URL por la de tu back-end
  private apiUrl = 'http://localhost:3001'; 

  constructor(private http: HttpClient) {}

  // Ejemplo de método GET para obtener datos de Producto
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto`);
  }
  getEquipos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/equipo`);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente`);
  }

  // Ejemplo de método POST para agregar un cliente
  addCliente(clienteData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cliente`, clienteData);
  }

  guardarInfo(datosEnviados: any){
    return this.http.post('http://localhost:3001/guardarInfo',datosEnviados);
  }

  // Agrega otros métodos GET/POST/PUT/DELETE según lo necesites
}
