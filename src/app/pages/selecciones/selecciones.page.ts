import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-selecciones',
  templateUrl: './selecciones.page.html',
  styleUrls: ['./selecciones.page.scss'],
})
export class SeleccionesPage implements OnInit {
  public products: any[] = [];
  public filteredProducts: any[] = [];
  public teams: any[] = [];

  constructor(
    private navCtrl: NavController,
    private service: ServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadTeams();
  }

  loadProducts() {
    this.service.getProductos().subscribe((products: any[]) => {
      this.products = products;
      this.combineData();
    });
  }

  loadTeams() {
    this.service.getEquipos().subscribe((teams: any[]) => {
      this.teams = teams;
      this.combineData();
    });
  }

  combineData() {
    if (this.products.length && this.teams.length) {
      this.products = this.products.map(product => {
        const team = this.teams.find(team => team.ID_Equipo === product.ID_Equipo);
        const base64String = product.Foto ? btoa(
          new Uint8Array(product.Foto.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        ) : null;
        
        return {
          ...product,
          teamType: team ? team.Tipo : null,
          FotoUrl: base64String ? this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`) : null,
          PrecioTransferencia: this.calculateTransferPrice(product.Precio)
        };
      }).filter(product => product.teamType === 'Pais');
      
      this.filteredProducts = this.products;
    }
  }

  calculateTransferPrice(originalPrice: number): number {
    // Aplicar un descuento del 10% para transferencias bancarias
    return originalPrice * 0.9;
  }

  filterProducts(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredProducts = this.products.filter(product => 
      product.Nombre.toLowerCase().includes(searchTerm) ||
      product.Descripcion.toLowerCase().includes(searchTerm)
    );
  }

  goToProductDetail(productId: number) {
    this.navCtrl.navigateForward(`/product-detail/${productId}`);
  }
}