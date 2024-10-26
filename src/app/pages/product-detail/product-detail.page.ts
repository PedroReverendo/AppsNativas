import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: any;
  selectedTalle: string | null = null;
  availableSizes: string[] = [];
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceService: ServiceService,
    private sanitizer: DomSanitizer,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.getProductDetails(productId);
  }

  getProductDetails(id: string | null) {
    if (id) {
      this.serviceService.getProductos().subscribe((products: any[]) => {
        this.product = products.find(p => p.ID_Producto === parseInt(id, 10));
        
        if (this.product) {
          if (this.product.Foto) {
            const base64String = btoa(
              new Uint8Array(this.product.Foto.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            this.product.FotoUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${base64String}`);
          }

          if (this.product.Talle) {
            this.availableSizes = this.product.Talle.split(',');
          }
        }
      });
    }
  }

  calculateTransferPrice(price: number): number {
    return price * 0.9;
  }

  incrementQuantity() {
    if (this.quantity < (this.product.Stock || 10)) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Función para optimizar el objeto del carrito
  private optimizeCartItem(product: any) {
    // Solo guardamos los campos necesarios
    return {
      ID_Producto: product.ID_Producto,
      Nombre: product.Nombre,
      Precio: product.Precio,
      selectedTalle: product.selectedTalle,
      quantity: product.quantity
    };
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  async addToCart() {
    if (!this.selectedTalle) {
      await this.presentToast('Por favor selecciona un talle', 'warning');
      return;
    }

    try {
      // Crear item optimizado para el carrito
      const cartItem = this.optimizeCartItem({
        ...this.product,
        quantity: this.quantity,
        selectedTalle: this.selectedTalle
      });

      // Intentar obtener el carrito actual
      let cart: any[] = [];
      const existingCart = localStorage.getItem('cart');
      
      if (existingCart) {
        try {
          cart = JSON.parse(existingCart);
        } catch (e) {
          console.error('Error parsing cart:', e);
          cart = [];
        }
      }

      // Buscar si el producto ya existe en el carrito
      const existingItemIndex = cart.findIndex(item => 
        item.ID_Producto === cartItem.ID_Producto && 
        item.selectedTalle === cartItem.selectedTalle
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += this.quantity;
      } else {
        cart.push(cartItem);
      }

      // Intentar guardar el carrito actualizado
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
        await this.presentToast('Producto agregado al carrito');
        this.router.navigate(['/cart']);
      } catch (e: any) {
        if (e.name === 'QuotaExceededError') {
          // Si el carrito está lleno, intentar limpiar items antiguos
          if (cart.length > 20) {
            cart = cart.slice(-20); // Mantener solo los últimos 20 items
            localStorage.setItem('cart', JSON.stringify(cart));
            await this.presentToast('Carrito actualizado (algunos items antiguos fueron removidos)');
          } else {
            await this.presentToast('No se puede agregar más items al carrito', 'danger');
            throw new Error('Cart storage limit reached');
          }
        } else {
          console.error('Error saving cart:', e);
          await this.presentToast('Error al guardar en el carrito', 'danger');
          throw e;
        }
      }
    } catch (error) {
      console.error('Error in addToCart:', error);
      await this.presentToast('Error al agregar al carrito', 'danger');
    }
  }
}