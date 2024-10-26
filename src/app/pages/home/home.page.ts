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
        this.productos = callback.map((producto: any) => {
          if (producto.Foto) {
            const base64String = btoa(
              new Uint8Array(producto.Foto.data).reduce((callback2, byte) => callback2 + String.fromCharCode(byte), '')
            );
            producto.FotoUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
          }
          return producto;
        });

        // Almacena los productos en memoria
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
