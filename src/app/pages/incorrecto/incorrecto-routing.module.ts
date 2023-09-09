import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncorrectoPage } from './incorrecto.page';

const routes: Routes = [
  {
    path: '',
    component: IncorrectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncorrectoPageRoutingModule {}
