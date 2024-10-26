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
    this.service.getProductos().subscribe(callback => {
      this.productos = callback.map((producto: any) => {
        // Convertir la imagen de binario a base64
        if (producto.Foto) {
          const base64String = btoa(
            new Uint8Array(producto.Foto.data).reduce((callback2, byte) => callback2 + String.fromCharCode(byte), '')
          );
          producto.FotoUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
        }
        return producto;
      });

      // Seleccionar 5 productos aleatorios
      this.productosSugeridos = this.getRandomProductos(5);
    }, error => {
      console.error('Error loading productos', error);
    });
  }

  getRandomProductos(count: number): any[] {
    const shuffled = [...this.productos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
