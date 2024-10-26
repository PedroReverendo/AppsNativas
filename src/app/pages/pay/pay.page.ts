import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.loadCartSummary();
  }

  loadCartSummary() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.totalAmount = this.cartItems.reduce((total, item) => total + (item.Precio * item.quantity), 0);
    }
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar compra',
      message: `El total a pagar es $${this.totalAmount}. ¿Deseas continuar?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Compra cancelada');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.confirmPurchase();
          }
        }
      ]
    });
    await alert.present();
  }

  confirmPurchase() {
    const ventaData = {
      items: this.cartItems,
      total: this.totalAmount,
      date: new Date()
    };

    this.serviceService.addVenta(ventaData).subscribe(
      response => {
        console.log('Compra confirmada y registrada en la base de datos', response);
        localStorage.removeItem('cart');  // Vaciar el carrito después de la compra
        this.navCtrl.navigateRoot('/home');  // Redirigir a la página principal
      },
      error => {
        console.error('Error al registrar la venta:', error);
      }
    );
  }
}
