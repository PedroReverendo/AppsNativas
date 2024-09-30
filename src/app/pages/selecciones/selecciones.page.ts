import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecciones',
  templateUrl: './selecciones.page.html',
  styleUrls: ['./selecciones.page.scss'],
})
export class SeleccionesPage implements OnInit {
  products = [
    { id: 1, name: 'Ejemplo1', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    { id: 2, name: 'Ejemplo2', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    { id: 3, name: 'Ejemplo 3', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToProductDetail(productId: number) {
    this.navCtrl.navigateForward(`/product-detail/${productId}`);
  }
}