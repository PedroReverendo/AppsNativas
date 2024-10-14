import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactPageModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then(m => m.PayPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'selecciones',
    loadChildren: () => import('./pages/selecciones/selecciones.module').then( m => m.SeleccionesPageModule)
  },
  {
    path: 'product-detail/:id', // Usa un parámetro para identificar el producto
    loadChildren: () => import('./pages/product-detail/product-detail.module').then(m => m.ProductDetailPageModule)
  },
  {
    path: 'europeas',
    loadChildren: () => import('./pages/europeas/europeas.module').then( m => m.EuropeasPageModule)
  },
  {
    path: 'sudamericana',
    loadChildren: () => import('./pages/sudamericana/sudamericana.module').then( m => m.SudamericanaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }