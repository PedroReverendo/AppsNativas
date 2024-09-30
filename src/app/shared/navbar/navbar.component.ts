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
    this.navCtrl.navigateForward('/cart');
  }
  goToHome() {
    this.navCtrl.navigateForward('/home');
  }
  goToContact() {
    this.navCtrl.navigateForward('/contact');
  }
  goToSelecciones() {
    this.navCtrl.navigateForward('/selecciones');
  }
  goTosudamericanas() {
    this.navCtrl.navigateForward('/');
  }
  goToEuropeas() {
    this.navCtrl.navigateForward('/');
  }

  ngOnInit() { }

  openMenu() {
    if (this.menu) {
      this.menu.open();
    }
  }
}