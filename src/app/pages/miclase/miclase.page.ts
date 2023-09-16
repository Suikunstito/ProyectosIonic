import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit {

  public usuario: Usuario;

  public sede: string = '';
  public idAsignatura: string = '';
  public seccion: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public dia: string = '';
  public bloqueInicio: string = '';
  public bloqueTermino: string = '';
  public horaInicio: string = '';
  public horaFin: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
   }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      const nav = this.router.getCurrentNavigation();
      if (nav) {
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          this.sede = nav.extras.state['sede'];
          this.idAsignatura = nav.extras.state['idAsignatura'];
          this.seccion = nav.extras.state['seccion'];
          this.nombreAsignatura = nav.extras.state['nombreAsignatura'];
          this.nombreProfesor = nav.extras.state['nombreProfesor'];
          this.dia = nav.extras.state['dia'];
          this.bloqueInicio = nav.extras.state['bloqueInicio'];
          this.bloqueTermino = nav.extras.state['bloqueTermino'];
          this.horaInicio = nav.extras.state['horaInicio'];
          this.horaFin = nav.extras.state['horaFin'];
          return;
        }
      }
      this.router.navigate(['/login']);
    });
  }

  public cambioPag(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario,
      }
    };
    this.router.navigate(['/inicio'], navigationExtras)
  }

}
