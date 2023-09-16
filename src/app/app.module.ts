import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule
    // CGV: Hay que agregar "{ innerHTMLTemplatesEnabled: true }" para poder hacer AllertController en HTML 
    , IonicModule.forRoot({ innerHTMLTemplatesEnabled: true })
    , AppRoutingModule
    // CGV: Módulos de Angular Material
    , BrowserAnimationsModule
    , MatNativeDateModule
    , MatInputModule
    , MatButtonModule
    , MatCardModule
    , MatFormFieldModule
    , MatCheckboxModule
    , MatDatepickerModule
    , MatRadioModule
    , MatSelectModule
    , MatRippleModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // CGV: Dejar módulos de Angular Material en español, por ejemplo, las fechas dd/mm/yyyy
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
