import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

interface CartItem {
  ID_Producto: number;
  Nombre: string;
  Precio: number;
  selectedTalle: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
        console.log('Carrito cargado:', this.cartItems);
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      this.cartItems = [];
    }
  }

  updateQuantity(productId: number, talle: string, change: number) {
    this.cartItems = this.cartItems.map(item => {
      if (item.ID_Producto === productId && item.selectedTalle === talle) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    this.saveCart();
  }

  async confirmClearCart() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro que deseas vaciar el carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.clearCart();
          }
        }
      ]
    });
    await alert.present();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

  getSubtotal() {
    return this.cartItems.reduce((total, item) => total + (item.Precio * item.quantity), 0);
  }

  getTotal() {
    return this.getSubtotal();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  goToPay() {
    console.log('Compra confirmada', this.cartItems);
    this.navCtrl.navigateForward('/pay');
  }
}