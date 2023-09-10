import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; // Permite navegar y pasar parámetros extra entre páginas
import { ToastController } from '@ionic/angular'; // Permite mostrar mensajes emergente
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage implements OnInit {
  public usuario: Usuario;

  constructor(private router: Router, private toastController: ToastController) {
    this.usuario = new Usuario('', '', '', '', '', '', 0, null)
  
  }

  ngOnInit() {
  }

}
