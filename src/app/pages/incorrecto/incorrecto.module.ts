import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncorrectoPageRoutingModule } from './incorrecto-routing.module';

import { IncorrectoPage } from './incorrecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncorrectoPageRoutingModule
  ],
  declarations: [IncorrectoPage]
})
export class IncorrectoPageModule {}
