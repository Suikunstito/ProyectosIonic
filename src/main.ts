import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

// CGV-INI-1: Bibliotecas agregadas
import { Capacitor } from '@capacitor/core';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { APP_INITIALIZER } from '@angular/core';
import { SqliteService } from './app/services/sqlite.service';
import { DataBaseService } from './app/services/data-base.service';
import { InitializeAppService } from './app/services/initialize-app.service';
import { AuthService } from './app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ApiClientService } from './app/services/api-client.service';
// CGV-FIN-1

if (environment.production) {
  enableProdMode();
}

/**
 *  CGV-INI-2:
 * 
 * Para que la App pueda ser usada en un browser, se habilitará "jeepSqlite",
 * lo que permitirá usar la base de datos del browser, la que se puede
 * revisar en el menú "Application" durante la depuración en Chrome.
 * 
 * ¡¡¡IMPORTANTE!!!
 * Se debe copiar manualmente el archivo "sql-wasm.wasm" desde la
 * carpeta "/node_modules/sql.js/dist/sql-wasm.wasm" a la carpeta "/src/assets"
 * 
 */
const platform = Capacitor.getPlatform();
if(platform === "web") {
  jeepSqlite(window);
  window.addEventListener('DOMContentLoaded', async () => {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      jeepEl.autoSave = true;
  });
}

export function initializeFactory(init: InitializeAppService) {
  return () => init.inicializarAplicacion();
}
// CGV-FIN-2 

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes),
    provideAnimations(),
    // CGV-INI-3: En esta sección se agregan los servicios que hemos implementado.
    provideIonicAngular(),
    importProvidersFrom(IonicModule.forRoot({ innerHTMLTemplatesEnabled: true })),
    importProvidersFrom(HttpClientModule),
    InitializeAppService,
    SqliteService,
    DataBaseService,
    AuthService,
    Storage,
    ApiClientService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeFactory,
        deps: [InitializeAppService],
        multi: true
    }
    // CGV-FIN-3
    ,
    provideAnimations(),
    provideAnimations()
],
});
