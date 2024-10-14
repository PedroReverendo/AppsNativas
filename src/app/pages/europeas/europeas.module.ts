import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EuropeasPageRoutingModule } from './europeas-routing.module';

import { EuropeasPage } from './europeas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EuropeasPageRoutingModule
  ],
  declarations: [EuropeasPage]
})
export class EuropeasPageModule {}
