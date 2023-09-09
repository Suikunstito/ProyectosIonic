import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;

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

  public recuperar(): void {
    if (this.usuario) {
      const usu: Usuario | undefined = this.usuario.buscarCorreoValido(this.usuario.correo);

      if (usu) {
        const navigationExtras: NavigationExtras = {
          state: {
            usuario: usu
          }
        };
        this.router.navigate(['/pregunta'], navigationExtras)
      }
      else {
        this.router.navigate(['/incorrecto'])
      }
    }
  } 

  ngOnInit() {
  }

}
