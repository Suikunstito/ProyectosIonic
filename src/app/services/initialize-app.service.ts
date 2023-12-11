import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';
import { DataBaseService } from './data-base.service';
import { AuthService } from './auth.service';
import { log } from '../tools/message-routines';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppService {

  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SqliteService,
    private dataBaseService: DataBaseService,
    private authService: AuthService
  ) { }

  async inicializarAplicacion() { 
    try {
      await this.sqliteService.inicializarPlugin().then(async (ret) => {
        this.platform = this.sqliteService.platform;
        if( this.sqliteService.platform === 'web') {
          await this.sqliteService.inicializarAlmacenamientoWeb();
        }
        await this.dataBaseService.inicializarBaseDeDatos().then(async () => {
          if( this.sqliteService.platform === 'web') {
            await this.sqliteService.guardarNombreBaseDeDatos(this.dataBaseService.nombreBD);
          }
          await this.authService.inicializarAutenticacion();
          this.isAppInit = true;
        });
      });
    } catch(error: any) {
      log('inicializarAplicacion', error);
    };
  }

}
