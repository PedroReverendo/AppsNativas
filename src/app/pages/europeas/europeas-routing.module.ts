import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EuropeasPage } from './europeas.page';

const routes: Routes = [
  {
    path: '',
    component: EuropeasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EuropeasPageRoutingModule {}
