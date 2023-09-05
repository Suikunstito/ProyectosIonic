import { NivelEducacional } from "./nivel-educacional";

export class Persona {

  public nombre;
  public apellido;
  public nivelEducacional: NivelEducacional | undefined;
  public fechaNacimiento: Date | null;

  constructor() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = undefined;
    this.fechaNacimiento = null;
  }

  public setPersona(nombre: string, apellido: string, idNivelEducacional: number
      , fechaNacimiento: Date | null) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.nivelEducacional = NivelEducacional.findNivelEducacionalById(idNivelEducacional);
    this.fechaNacimiento = fechaNacimiento;
  }

  public getNombre(): string {
    if (this.nombre.trim() === '') return 'No asignado';
    return this.nombre;
  }

  public getApellido(): string {
    if (this.apellido.trim() === '') return 'No asignado';
    return this.apellido;
  }

  public getIdNivelEducacional(): string {
    if (this.nivelEducacional === undefined) return 'No asignado';
    return this.nivelEducacional.id.toString();
  }

  public getNombreNivelEducacional(): string {
    if (this.nivelEducacional === undefined) return 'No asignado';
    return this.nivelEducacional.nombre;
  }

  public  getNivelEducacional(): string {
    if (this.nivelEducacional === undefined) return 'No asignado';
    return `${this.nivelEducacional.id} - ${this.nivelEducacional.nombre}`;
  }

  public getFechaNacimiento(): string {
    if (this.fechaNacimiento === null) return 'No asignado';
    return this.formatDateToDDMMYYYY(this.fechaNacimiento);
  }

  public formatDateToDDMMYYYY(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses van de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}