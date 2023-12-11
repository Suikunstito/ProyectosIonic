import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CorreoPage implements OnInit {

  constructor(private router: Router, private bd: DataBaseService) { }

  correo = '';

  ngOnInit() {
  }
  async comprobarCorreo(correo: string) {
    await this.bd.validarCorreo(correo).then(async (usuario: Usuario | undefined) => {
      if (usuario) {
        showToast(`El correo es: ${usuario.correo}`);
        this.router.navigate(['/pregunta'], { queryParams: { pregunta: usuario.preguntaSecreta } });
        console.log(usuario)
      } else {
        this.router.navigate(['/incorrecto']);
      }
    });
  }

  volverIngreso() {
    this.router.navigate(['/ingreso']);
  }

}