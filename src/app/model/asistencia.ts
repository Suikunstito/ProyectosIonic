export class Asistencia {

  public bloqueInicio: number;
  public bloqueTermino: number;
  public dia: string;
  public horaFin: string;
  public horaInicio: string;
  public idAsignatura: string;
  public nombreAsignatura: string;
  public nombreProfesor: string;
  public seccion: string;
  public sede: string;

  constructor() {
    this.bloqueInicio = 0;
    this.bloqueTermino = 0;
    this.dia = '';
    this.horaFin = '';
    this.horaInicio = '';
    this.idAsignatura = '';
    this.nombreAsignatura = '';
    this.nombreProfesor = '';
    this.seccion = '';
    this.sede = '';
  }

  public setAsistencia(
    bloqueInicio: number,
    bloqueTermino: number,
    dia: string,
    horaFin: string,
    horaInicio: string,
    idAsignatura: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    seccion: string,
    sede: string): void
  {
    this.bloqueInicio = bloqueInicio;
    this.bloqueTermino = bloqueTermino;
    this.dia = dia;
    this.horaFin = horaFin;
    this.horaInicio = horaInicio;
    this.idAsignatura = idAsignatura;
    this.nombreAsignatura = nombreAsignatura;
    this.nombreProfesor = nombreProfesor;
    this.seccion = seccion;
    this.sede = sede;
  }

}
