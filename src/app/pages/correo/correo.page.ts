import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { ToastController } from '@ionic/angular'; 
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;
  public correo: string = '';

  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null)
    this.usuario.setUsuario('atorres@duocuc.cl', '1234');
    
  }

  public recuperar(): void {
    if (this.usuario) {
      const usu: Usuario | undefined = this.usuario.buscarCorreoValido(this.correo);

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
