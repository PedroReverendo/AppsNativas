import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public productos: any[] = [];
  public productosSugeridos: any[] = [];

  constructor(
    private navCtrl: NavController,
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadProductos();
  }

  goToSelecciones() {
    this.navCtrl.navigateForward('/selecciones');
  }

  goToSudamericana() {
    this.navCtrl.navigateForward('/sudamericana');
  }

  goToEuropeas() {
    this.navCtrl.navigateForward('/europeas');
  }

  loadProductos() {
    // Verifica si ya hay productos en memoria
    this.productos = this.service.getProductosEnMemoria();
    if (this.productos.length === 0) {
      // Si no hay productos en memoria, haz la solicitud GET
      this.service.getProductos().subscribe(callback => {
        
        //IMAGEN
        //pasa de binario a ASCII lo pone en un string y a partir del base64 (ASCII) no pasa a una url convencional
        this.productos = callback.map((producto: any) => {
          if (producto.Foto) {
            const base64String = btoa(
              new Uint8Array(producto.Foto.data).reduce((callback2, byte) => callback2 + String.fromCharCode(byte), '')
            );
            producto.FotoUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
          }
          return producto;
        });


        //Utilizo este metodo para no sobrecargar la compilacion del navegadro y reducir tiempos de espera. Cuando los datos se cargan una vez se guardan en el servicio de forma local para una carga mas optimmizada si se llega a entrar a esa seccion. (los datos quedan guardadas por la seccion actual, no es LocalStorage)
        // Almacena los productos en memoria (servvice)
        this.service.setProductos(this.productos);

        // Seleccionar 5 productos aleatorios
        this.productosSugeridos = this.getRandomProductos(5);
      }, error => {
        console.error('Error loading productos', error);
      });
    } else {
      // Si hay productos en memoria, selecciona 5 aleatorios
      this.productosSugeridos = this.getRandomProductos(5);
    }
  }

  getRandomProductos(count: number): any[] {
    const shuffled = [...this.productos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
