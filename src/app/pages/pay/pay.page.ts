import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  constructor(private alertController: AlertController) {}

  ngOnInit() {
  }

    // ALERT
    async presentConfirmAlert() {
      const alert = await this.alertController.create({
        header: 'Confirmar compra',
        message: 'El pago se realizará instantáneamente después de realizar la compra.',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Compra cancelada');
            }
          }, {
            text: 'Confirmar',
            handler: () => {
              console.log('Compra confirmada');
              // Aquí puedes agregar lógica adicional para procesar la compra
            }
          }
        ]
      });
  
      await alert.present();
  }
}
