import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { PayPageRoutingModule } from './pay-routing.module';

import { PayPage } from './pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule,
    SharedModule
  ],
  declarations: [PayPage]
})
export class PayPageModule {}
