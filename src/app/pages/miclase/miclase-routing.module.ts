import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiclasePage } from './miclase.page';

const routes: Routes = [
  {
    path: '',
    component: MiclasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiclasePageRoutingModule {}
