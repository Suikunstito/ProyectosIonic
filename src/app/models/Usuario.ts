export class Usuario {
    correo = "";
    password = "";
    nombre = "";
    apellido = "";
    preguntaSecreta = "";
    respuestaSecreta = "";

    constructor() { }

    setUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string) {
        this.correo = correo;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.preguntaSecreta = preguntaSecreta;
        this.respuestaSecreta = respuestaSecreta;
      }
    
      static getUsuario(correo: string, password: string, nombre: string, apellido: string, preguntaSecreta: string, respuestaSecreta: string) {
        const usu = new Usuario();
        usu.setUsuario(correo, password, nombre, apellido, preguntaSecreta, respuestaSecreta)
        return usu;
      }
    
      validarCampoRequerido(nombreCampo: string, valor: string) {
        if (valor.trim() === '') return `El campo "${nombreCampo}" debe tener un valor.`;
        return '';
      }
    
      validarCorreo(correo: string): string {
        return this.validarCampoRequerido('correo', correo);
      }
    
      validarPassword(password: string): string {
        return this.validarCampoRequerido('contraseña', password);
      }
    
      validarNombre(nombre: string): string {
        return this.validarCampoRequerido('nombre', nombre);
      }
    
      validarApellido(apellido: string): string {
        return this.validarCampoRequerido('apellido', apellido);
      }
    
      validarPreguntaSecreta(preguntaSecreta: string): string {
        return this.validarCampoRequerido('pregunta secreta', preguntaSecreta);
      }
    
      validarRespuestaSecreta(respuestaSecreta: string): string {
        return this.validarCampoRequerido('respuesta secreta', respuestaSecreta);
      }
    
      validarPropiedadesUsuario(correo: string, password: string, nombre: string, apellido: string
        , preguntaSecreta: string, respuestaSecreta: string): string {
        return this.validarCorreo(correo) 
          || this.validarPassword(password)
          || this.validarNombre(nombre)
          || this.validarApellido(apellido)
          || this.validarPreguntaSecreta(preguntaSecreta)
          || this.validarRespuestaSecreta(respuestaSecreta)
      }
    
    }