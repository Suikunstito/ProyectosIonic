export class NivelEducacional {

  public id: number;
  public nombre: string;

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

  public toString(): string {
    return `${this.id} - ${this.nombre}`;
  }

  public static findNivelEducacionalById(id: number): NivelEducacional | undefined {
    return this.getNivelesEducacionales().find(n => n.id === id);
  }

  public static getNivelesEducacionales(): NivelEducacional[] {
    const nived = [];
    nived.push(new NivelEducacional(1, 'Sin nivel educacional'));
    nived.push(new NivelEducacional(2, 'Básica incompleta'));
    nived.push(new NivelEducacional(3, 'Básica completa'))
    nived.push(new NivelEducacional(4, 'Media incompleta'));
    nived.push(new NivelEducacional(5, 'Media completa'));
    nived.push(new NivelEducacional(6, 'Superior incompleta'));
    nived.push(new NivelEducacional(7, 'Superior completa'));
    return nived;
  }
}