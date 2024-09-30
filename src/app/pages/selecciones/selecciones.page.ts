import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecciones',
  templateUrl: './selecciones.page.html',
  styleUrls: ['./selecciones.page.scss'],
})
export class SeleccionesPage implements OnInit {
  // Lista de productos
  products = [
    { id: 1, name: 'Ejemplo1', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    { id: 2, name: 'Ejemplo2', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    { id: 3, name: 'Ejemplo 3', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    // Añade más productos aquí
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  // Función para navegar a los detalles del producto
  goToProductDetail(productId: number) {
    this.navCtrl.navigateForward(`/product-detail/${productId}`);
  }
}