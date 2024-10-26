import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu?: IonMenu;

  constructor(private navCtrl: NavController) {}
  
  goToCart() {
    this.navCtrl.navigateForward('/cart', { replaceUrl: true });
  }
  goToHome() {
    this.navCtrl.navigateForward('/home', { replaceUrl: true });
  }
  goToContact() {
    this.navCtrl.navigateForward('/contact', { replaceUrl: true });
  }
  goToSelecciones() {
    this.navCtrl.navigateForward('/selecciones', { replaceUrl: true });
  }
  goTosudamericanas() {
    this.navCtrl.navigateForward('/sudamericana', { replaceUrl: true });
  }
  goToEuropeas() {
    this.navCtrl.navigateForward('/europeas', { replaceUrl: true });
  }

  ngOnInit() { }

  openMenu() {
    if (this.menu) {
      this.menu.open();
    }
  }
}