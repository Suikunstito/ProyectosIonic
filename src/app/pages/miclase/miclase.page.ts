import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { Usuario } from 'src/app/model/usuario';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.page.html',
  styleUrls: ['./miclase.page.scss'],
})
export class MiclasePage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;


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

  constructor(private route: ActivatedRoute
    , private router: Router
    , private animationController: AnimationController) {
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

  public ngAfterViewInit(): void {
    if (this.itemTitulo) {
      const animation = this.animationController
        .create()
        .addElement(this.itemTitulo.nativeElement)
        .iterations(Infinity)
        .duration(6000)
        .fromTo('transform', 'translate(0%)', 'translate(100%)')
        .fromTo('opacity', 0.2, 1);

      animation.play();
    }
  }

  public animateItem(elementRef: any) {
    this.animationController
      .create()
      .addElement(elementRef)
      .iterations(1)
      .duration(600)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .play();
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
