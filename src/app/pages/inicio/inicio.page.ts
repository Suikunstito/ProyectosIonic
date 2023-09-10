import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController} from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
})

export class InicioPage implements OnInit, AfterViewInit {

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;

  public usuario: Usuario;
  public idNivelEducacional: number;

  public nivelesEducacionales: NivelEducacional[] = NivelEducacional.getNivelesEducacionales();

   constructor(
        private activeroute: ActivatedRoute 
      , private router: Router 
      , private alertController: AlertController 
      , private animationController: AnimationController) {  

    this.usuario = new Usuario('', '', '', '', '', '', 0, null);
    this.idNivelEducacional = 0;

    
    this.activeroute.queryParams.subscribe(params => { 

      const nav = this.router.getCurrentNavigation();
      if (nav) {
        
        if (nav.extras.state) {
          this.usuario = nav.extras.state['usuario'];
          if (this.usuario.nivelEducacional !== undefined) {
            this.idNivelEducacional = this.usuario.nivelEducacional.id;
          }
          return;
        }
      }
      this.router.navigate(['/login']);

    });
  }

  public ngOnInit(): void {

  }

  public cambiarNivelEducacional(): void {
    this.usuario.setNivelEducacional(this.idNivelEducacional);
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

  public limpiarFormulario(): void {

    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.nivelEducacional = undefined;
    this.idNivelEducacional = 0;
    this.usuario.fechaNacimiento = null;

    this.animateItem(this.itemNombre.nativeElement);
    this.animateItem(this.itemApellido.nativeElement);
    this.animateItem(this.itemEducacion.nativeElement);
    this.animateItem(this.itemFechaNacimiento.nativeElement);
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

  public mostrarDatosPersona(): void {
    
    
    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.presentAlert('Datos personales', 'Para mostrar los datos de la persona, '
        + 'al menos debe tener un valor para el nombre o el apellido.');
      return;
    }

    
    let mensaje = '';
    if (this.usuario) {
      mensaje += '<br><b>Usuario</b>: <br>' + this.usuario.getCorreo();
      mensaje += '<br><b>Nombre</b>: <br>' + this.usuario.getNombre();
      mensaje += '<br><b>Apellido</b>: <br>' + this.usuario.getApellido();
      mensaje += '<br><b>Educación</b>: <br>' + this.usuario.getNivelEducacional();
      mensaje += '<br><b>Nacimiento</b>: <br>' + this.usuario.getFechaNacimiento();

      this.presentAlert('Datos personales', mensaje);
    }
  }

  
  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
  public escanear(): void {
    this.router.navigate(['/qrreader']);
  }
}
