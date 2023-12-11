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
  
    obtenerAsistenciaDesdeQR(datosQR: string) {
      if (this.verificarAsistenciaDesdeQR(datosQR)) {
        return JSON.parse(datosQR) as Asistencia;
      }
      return new Asistencia();
    }
  
    verificarAsistenciaDesdeQR(datosQR: string) {
      if (datosQR !== '') {
        try {
          const json = JSON.parse(datosQR);
          // Devolver verdadero si el texto del QR contiene todos los datos de
          // una asistencia, de lo contrario se ha escaneado un QR que a lo 
          // mejor es válido, pero es de otra cosa que no es una asistencia.
          if (json.bloqueInicio !== undefined
            && json.bloqueTermino !== undefined
            && json.dia !== undefined
            && json.horaFin !== undefined
            && json.horaInicio !== undefined
            && json.idAsignatura !== undefined
            && json.nombreAsignatura !== undefined
            && json.nombreProfesor !== undefined
            && json.seccion !== undefined
            && json.sede !== undefined
            ) {
            return true;
          }
        } catch(error: any) {}
      }
      return false;
    }
  
  }
