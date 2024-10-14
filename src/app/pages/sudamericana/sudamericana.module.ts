import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/shared.module';
import { SudamericanaPageRoutingModule } from './sudamericana-routing.module';
import { SudamericanaPage } from './sudamericana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SudamericanaPageRoutingModule,
  ],
  declarations: [SudamericanaPage]
})
export class SudamericanaPageModule {}
