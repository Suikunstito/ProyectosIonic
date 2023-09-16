import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import jsQR, { QRCode } from 'jsqr';
import { Asistencia } from 'src/app/model/asistencia';


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

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('canvas')
  private canvas!: ElementRef;

  public asistencia: Asistencia = new Asistencia();
  public escaneando = false;
  public datosQR: string = '';

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

  private mediaStream: MediaStream | null = null;

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

    // Logica por si se llega a la pagina sin Usuario
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

  // Metodo utilizado para inicializar o traer datos
  public ngOnInit(): void {

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

  // Metodo utilizado para eliminar datos o detener componentes
  ngOnDestroy(): void {
    this.detenerCamara();
  }


  // Metodo que inicializa la camara del dispositivo y muestra la imagen en la pagina
  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.mediaStream = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  // Metodo bucle que busca por frame
  async verificarVideo() {
    // Se asegura de que el video disponga de suficientes datos para procesarlo de manera adecuada
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {

      // Si 'obtenerDatosQR' es verdadero o 'escaneando' es falso, la funcion retorna y termina "verificarVideo"
      if (this.obtenerDatosQR() || !this.escaneando) return;

      // En cualquier otro caso, la funcion continuea en bucle y analiza el siguiente frame de video
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

  // Metodo que verifica si el frame que hay en pantalla registra datos
  public obtenerDatosQR(): boolean {
    const w: number = this.video.nativeElement.videoWidth;
    const h: number = this.video.nativeElement.videoHeight;
    this.canvas.nativeElement.width = w;
    this.canvas.nativeElement.height = h;
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    let qrCode: QRCode | null = jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      if (qrCode.data !== '') {
        this.escaneando = false;
        this.mostrarDatosQROrdenados(qrCode.data);
        return true;
      }
    }
    return false;
  }


  // Metoodo que traduce los datos obtenidos para ser utilizados
  public mostrarDatosQROrdenados(datosQR: string): void {
    this.datosQR = datosQR;


    const objetoDatosQR = JSON.parse(datosQR);
    this.sede = objetoDatosQR.sede;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.seccion = objetoDatosQR.seccion;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.dia = objetoDatosQR.dia;
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.horaFin = objetoDatosQR.horaFin;

    this.cambioPag();
    this.detenerCamara();
  }

  public detenerEscaneoQR(): void {
    this.escaneando = false;
    this.detenerCamara();
  }

  private detenerCamara(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  //

  public cambiarNivelEducacional(): void {
    this.usuario.setNivelEducacional(this.idNivelEducacional);
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

  public async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  public cambioPag(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario,
        sede: this.sede,
        idAsignatura: this.idAsignatura,
        seccion: this.seccion,
        nombreAsignatura: this.nombreAsignatura,
        nombreProfesor: this.nombreProfesor,
        dia: this.dia,
        bloqueInicio: this.bloqueInicio,
        bloqueTermino: this.bloqueTermino,
        horaInicio: this.horaInicio,
        horaFin: this.horaFin
      }
    };
    this.router.navigate(['/miclase'], navigationExtras)
  }
}
