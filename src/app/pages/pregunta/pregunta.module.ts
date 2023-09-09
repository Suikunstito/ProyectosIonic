import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntaPageRoutingModule } from './pregunta-routing.module';

import { PreguntaPage } from './pregunta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntaPageRoutingModule
  ],
  declarations: [PreguntaPage]
})
export class PreguntaPageModule {}
