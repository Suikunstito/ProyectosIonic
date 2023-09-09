import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrreaderPage } from './qrreader.page';

const routes: Routes = [
  {
    path: '',
    component: QrreaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrreaderPageRoutingModule {}
