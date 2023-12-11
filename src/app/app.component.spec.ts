import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Usuario } from './models/Usuario';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Usuarios', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            }).compileComponents();
    });

    describe('Nombre de la suite de pruebas', () => {
        it('debería hacer algo', () => {
          // Código de la prueba
          expect(true).toBe(true);
        });
      
        it('otra prueba', () => {
          // Otra prueba
          expect(1 + 1).toBe(2);
        });
      });

});