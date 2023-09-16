import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { ToastController } from '@ionic/angular'; 
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  public usuario: Usuario;
  public correo: string = "";
  public password: string = "";

  
  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null)
  }

  public ngOnInit(): void {

    
  }

  // Al presionar el boton ingresar...
  public ingresar(): void {
    // Setea el usuario actual con las credenciales 'correo' y 'password'...
    this.usuario.setUsuario(this.correo, this.password)
    
    if (this.usuario) {
      // Valida el usuario ingresado...
      const mensajeError = this.usuario.validarUsuario();
      if (mensajeError) {
        this.mostrarMensaje(mensajeError);
        return;
      }

      // Se crea una variable 'usu' de tipo Usuario o undefined dependiendo de si las credenciales coinciden...
      const usu: Usuario | undefined = this.usuario.buscarUsuarioValido(this.correo, this.password);
      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.mostrarMensaje(`¡Bienvenido(a) ${usu.nombre} ${usu.apellido}!`);
        this.router.navigate(['/inicio'], navigationExtras); 
      }
    }
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
  

}
