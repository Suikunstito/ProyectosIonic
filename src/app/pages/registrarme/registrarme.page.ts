import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegistrarmePage implements OnInit {

  usuario = new Usuario();
  mensajeConfirmacion: string = '';
  mensajeError: string = '';
  repeticionPassword = '';

  constructor(private router: Router, private authService: AuthService, private bd: DataBaseService
    , private toastController: ToastController) { }

  ngOnInit() {
  }

  async registrarUsuario() {
    this.mensajeError = this.usuario.validarPropiedadesUsuario(
      this.usuario.correo,
      this.usuario.password,
      this.usuario.nombre,
      this.usuario.apellido,
      this.usuario.preguntaSecreta,
      this.usuario.respuestaSecreta
    );

    if (this.mensajeError.length === 0) {
      await this.bd.guardarUsuario(this.usuario);
      this.mensajeConfirmacion = 'Usuario creado con éxito.';
      this.mostrarMensajeConfirmacion(this.mensajeConfirmacion);

      // Puedes redirigir a la página de inicio de sesión o a donde desees después de registrar.
      this.router.navigate(['/ingreso']);
    } else {
      this.mostrarMensajeError(this.mensajeError);
    }
  }

  async mostrarMensajeConfirmacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: 'success' // Puedes personalizar el color según tus preferencias
    });
    toast.present();
  }

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color: 'danger' // Puedes personalizar el color según tus preferencias
    });
    toast.present();
  }

  volverAlInicio() {
    this.router.navigate(['/inicio']); // Reemplaza '/inicio' con la ruta correcta a tu página de inicio.
  }
}