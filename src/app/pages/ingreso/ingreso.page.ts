import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  // CGV: La clase typescript "LoginPage" es la encargada de implementar las reglas de negocio de la página.
  // Las propiedades del archivo typescript pueden intercambiar valores con los elementos HTML, por medio
  // de "Modelo Angular". Por ejemplo, el siguiente TAG se enlaza con la propiedad "usuario.correo":
  //   <ion-input type="text" [(ngModel)]="usuario.correo"></ion-input>
  // Gracias a este modelo, cada vez que cambia la caja de texto entonces cambia la propiedad y viceversa.

  public usuario: Usuario;

  // CGV: Para poder trabajar con Router y poder navegar hacia la página "home", debemos primero pasar como
  // parámetro e instanciar un objeto de la clase "Router". Fijarse que el tipo de dato, que se pasa 
  // en el constructor es "Router" con mayúscula, porque se trata de una clase y éstas parten con letra 
  // mayúscula, mientras que "router" con minúscula es el objeto de esa clase, que usaremos para ejecutar
  // el método "navigate". La creación de parámetros "private" en el constructor se llama 
  // "Inyección de Dependencia" y es una práctica recomendada en Angular, que permite crear el objeto
  // como una propiedad más de la página y así poder usarla. Por otro lado, la "Inyección de Dependencia"
  // permite compartir una única instancia de dicho objeto en el resto de las páginas que lo usen. Lo
  // anterior es especialmente importante para mantener la coherencia y estados compartidos en los Servicios.
  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null)
  
    // Puedes descomentar cualquiera de los siguientes usuarios, para 
    // hacer tus pruebas y así no tener que digitarlos a cada rato

    // this.usuario.setUsuario('sin.datos@duocuc.cl', '1234');
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
    // this.usuario.setUsuario('jperez@duocuc.cl', '5678');
    // this.usuario.setUsuario('cmujica@duocuc.cl', '0987');
    // this.usuario.setUsuario('usuario.inexistente@duocuc.cl', '1234');
    // this.usuario.setUsuario('atorres@duocuc.cl', 'password mala');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999999999999');
    // this.usuario.setUsuario('atorres@duocuc.cl', '9999');
    // this.usuario.setUsuario('correo.malo', '0987');
    // this.usuario.setUsuario('correo.malo@', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc', '0987');
    // this.usuario.setUsuario('correo.malo@duocuc.', '0987');
  }

  public ngOnInit(): void {

    // Puedes descomentar la siguiente línea si quieres que la aplicación navegue directamente
    // a la página Home, así te ahorras de estar apretando el botón "Ingresar" a cada rato
    
    //if (this.usuario.correo !== '') this.ingresar();
  }

  public ingresar(): void {
    
    if (this.usuario) {
      
      // Validamos el usuario y si hay error no navegaremos a la página Home
      const mensajeError = this.usuario.validarUsuario();
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      }

      // Como la página sólo permite ingresar el correo y la password, vamos a buscar el usuario para completar sus datos
      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(this.usuario.correo, this.usuario.password);
      
      if (usu) {
        // NavigationExtras sirve para pasarle parámetros a la página Home. Los parámetros se agregan al objeto "state"
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.mostrarMensaje(`¡Bienvenido(a) ${usu.nombre} ${usu.apellido}!`);
        this.router.navigate(['/inicio'], navigationExtras); // Navegamos hacia el Home y enviamos la información extra
      }
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    // Permite mostrar un mensaje emergente que dura unos pocos segundos y desaparece. El mensaje es asincrónico, 
    // los que permite que el mensaje se pueda ver incluso cuando ya ha cambiado a la siguiente página.
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
