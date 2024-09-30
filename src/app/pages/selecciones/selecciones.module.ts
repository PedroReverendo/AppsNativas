import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { SeleccionesPageRoutingModule } from './selecciones-routing.module';

import { SeleccionesPage } from './selecciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionesPageRoutingModule,
    SharedModule
  ],
  declarations: [SeleccionesPage]
})
export class SeleccionesPageModule {}
