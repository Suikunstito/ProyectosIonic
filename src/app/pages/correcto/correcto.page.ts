import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';
@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {
  public usuario: Usuario;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state && nav.extras.state['usuario']) {
          this.usuario = nav.extras.state['usuario'];
          return;
        }
      }
      this.router.navigate(['/login']);
    });
  }
}
