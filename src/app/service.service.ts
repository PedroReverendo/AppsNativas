import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // Cambia esta URL por la de tu back-end
  private apiUrl = 'http://localhost:3001'; 
  private productos: any[] = [];  // Almacenamiento en memoria

  constructor(private http: HttpClient) {}
  //GET PRODUCTOS
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/producto`);
  }

  setProductos(productos: any[]) {
    this.productos = productos;  // Almacenar productos en memoria
  }

  getProductosEnMemoria() {
    return this.productos;  // Obtener productos de memoria
  }

  //GET EQUIPOS
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

  // Método GET para obtener datos de Venta
  getVentas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/venta`);
  }

  // Método POST para agregar una venta
  addVenta(ventaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/venta`, ventaData);
  }

  // Agrega otros métodos GET/POST/PUT/DELETE según lo necesites
}
