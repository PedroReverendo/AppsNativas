import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage {
  products = [
    { id: 1, name: 'Ejemplo1', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    { id: 2, name: 'Ejemplo2', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    { id: 3, name: 'Ejemplo 3', image: '../../../assets/img/CAMISETAS RETRO SELECCIONES.png' },
    // Añade más productos aquí
  ];
  constructor(private navCtrl: NavController) {}

  // Función para agregar al carrito y redirigir a la página de carrito
  addToCart(productId: number) {
    // Aquí puedes implementar la lógica de agregar el producto al carrito (guardar en una variable, local storage, etc.)
    console.log(`Producto ${productId} agregado al carrito`);

    // Redirige a la página del carrito
    this.navCtrl.navigateForward('/cart');
  }
}
