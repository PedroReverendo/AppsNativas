import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems = [
    { id: 1, name: 'Camiseta Francia 1998', price: 21999, quantity: 1 },
    { id: 2, name: 'Camiseta Brasil 2002', price: 21999, quantity: 1 },

  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goToPay() {
    this.navCtrl.navigateForward('/pay');
  }

  // Función para calcular el total
  getTotal() {
    return this.cartItems.reduce((i, j) => i + j.price * j.quantity, 0);
  }

  // Función para vaciar el carrito
  clearCart() {
    this.cartItems = [];
  }

}
