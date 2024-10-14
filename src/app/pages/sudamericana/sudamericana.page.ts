import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr, 'es-AR');


@Component({
  selector: 'app-sudamericana',
  templateUrl: './sudamericana.page.html',
  styleUrls: ['./sudamericana.page.scss'],
})
export class SudamericanaPage implements OnInit {
  public productos: any[] = [];

  constructor(
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.service.getProductos().subscribe(
      (data) => {
        this.productos = data.map((producto: any) => {
          // Convertir la imagen de binario a base64
          // producto.precio / 100;
          if (producto.Foto) {
            const base64String = btoa(
              new Uint8Array(producto.Foto.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            producto.FotoUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
          }

          // Formatear el precio
          producto.PrecioFormateado = producto.Precio.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 2
          });

          return producto;
        });
        console.log(this.productos);
      },
      (error) => {
        console.error('Error loading productos', error);
      }
    );
  }

  calcularDescuento(precio: number, descuento: number): number {
    return precio - precio * descuento;
  }
  
}
