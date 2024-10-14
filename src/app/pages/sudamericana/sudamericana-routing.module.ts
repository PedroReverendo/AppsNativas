import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SudamericanaPage } from './sudamericana.page';

const routes: Routes = [
  {
    path: '',
    component: SudamericanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SudamericanaPageRoutingModule {}
