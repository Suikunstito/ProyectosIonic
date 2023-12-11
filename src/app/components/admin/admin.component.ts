import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioAdminCorreo: string = 'admin@example.com';

  constructor(private dataBaseService: DataBaseService, private toastController: ToastController) {}

  ngOnInit() {
    // Suscribe al BehaviorSubject para recibir actualizaciones en la lista de usuarios
    this.dataBaseService.listaUsuarios.subscribe((usuarios) => {
      this.usuarios = usuarios;
    });

    this.dataBaseService.leerUsuarios();
  }

  async eliminarUsuario(correo: string) {
    try {
      await this.dataBaseService.eliminarUsuarioUsandoCorreo(correo);
      this.mostrarMensaje('Usuario eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      this.mostrarMensaje('Error al eliminar usuario', 'danger');
    }
  }

  async mostrarMensaje(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      color: color,
      duration: 2000,
    });
    toast.present();
  }

}