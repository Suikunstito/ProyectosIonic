import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/model/asistencia';
import jsQR, { QRCode } from 'jsqr';
import { Router, NavigationExtras } from '@angular/router'; 

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage implements OnInit {

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

  public constructor(private router: Router) {
  }

  public ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.detenerCamara();
  }

  public async comenzarEscaneoQR() {
    const mediaProvider: MediaProvider = await navigator.mediaDevices.getUserMedia({
      video: {facingMode: 'environment'}
    });
    this.video.nativeElement.srcObject = mediaProvider;
    this.mediaStream = mediaProvider;
    this.video.nativeElement.setAttribute('playsinline', 'true');
    this.video.nativeElement.play();
    this.escaneando = true;
    requestAnimationFrame(this.verificarVideo.bind(this));
  }

  async verificarVideo() {
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      if (this.obtenerDatosQR() || !this.escaneando) return;
      requestAnimationFrame(this.verificarVideo.bind(this));
    } else {
      requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }

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

    const navigationExtras: NavigationExtras = {
      state: {
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

}
