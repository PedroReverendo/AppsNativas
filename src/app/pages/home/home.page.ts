import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { ServiceService } from '../../service.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public productos: any[] = [];
  
  constructor(
    private navCtrl: NavController,
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  goToSelecciones() {
    this.navCtrl.navigateForward('/selecciones');
  }

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.service.getProductos().subscribe(data => {
      this.productos = data.map((producto: any) => {
        // Convertir la imagen de binario a base64
        if (producto.Foto) {
          const base64String = btoa(
            new Uint8Array(producto.Foto.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          producto.FotoUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
        }
        return producto;
      });
      console.log(this.productos);
    }, error => {
      console.error('Error loading productos', error);
    });
  }
}
