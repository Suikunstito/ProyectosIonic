import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrectoPage } from './correcto.page';

const routes: Routes = [
  {
    path: '',
    component: CorrectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrectoPageRoutingModule {}
