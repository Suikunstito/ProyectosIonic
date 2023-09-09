import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiclasePageRoutingModule } from './miclase-routing.module';

import { MiclasePage } from './miclase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiclasePageRoutingModule
  ],
  declarations: [MiclasePage]
})
export class MiclasePageModule {}
