import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SqliteService } from './sqlite.service';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
        CREATE TABLE IF NOT EXISTS USUARIO (
          correo TEXT PRIMARY KEY NOT NULL,
          password TEXT NOT NULL,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          preguntaSecreta TEXT NOT NULL,
          respuestaSecreta TEXT NOT NULL
        );
      `]
    }
  ]

  nombreBD = 'asistencia1';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private sqliteService: SqliteService) { }

  async inicializarBaseDeDatos() {
    await this.sqliteService.crearBaseDeDatos({ database: this.nombreBD, upgrade: this.userUpgrades });
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
  }

  async crearUsuariosDePrueba() {
    await this.leerUsuario('atorres@duocuc.cl').then(async usuario => {
      if (!usuario) await this.guardarUsuario(Usuario.getUsuario('atorres@duocuc.cl', '1234', 'Ana', 'Torres', 'Nombre de mi mascota', 'gato'));
      this.leerUsuario('mati.rodriguez@duocuc.cl').then(async usuario => {
        if (!usuario) await this.guardarUsuario(Usuario.getUsuario('mati.rodriguez@duocuc.cl', '1234', 'Matias', 'Rodriguez', 'Nombre de mi mascota', 'gato'));
        this.leerUsuario('ga.campomanes@duocuc.cl').then(async usuario => {
          if (!usuario) await this.guardarUsuario(Usuario.getUsuario('ga.campomanes@duocuc.cl', '1234', 'Gabriela', 'Campomanes', 'Gata', 'churu'));
        });
      });
    });
  }

  async guardarUsuario(usuario: Usuario) {
    const sql = 'INSERT OR REPLACE INTO USUARIO (correo, password, nombre, apellido, ' +
      'preguntaSecreta, respuestaSecreta) VALUES (?,?,?,?,?,?);';
    await this.db.run(sql, [usuario.correo, usuario.password, usuario.nombre, usuario.apellido,
    usuario.preguntaSecreta, usuario.respuestaSecreta]);
    await this.leerUsuarios();
  }

  async leerUsuarios() {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
  }

  async leerUsuario(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;', [correo])).values as Usuario[];
    return usuarios[0];
  }

  async eliminarUsuarioUsandoCorreo(correo: string) {
    await this.db.run('DELETE FROM USUARIO WHERE correo=?', [correo]);
    await this.leerUsuarios();
  }

  async validarUsuario(correo: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=? AND password=?;',
      [correo, password])).values as Usuario[];
    return usuarios[0];
  }

  // Actualizar sesión activa
  async actualizarSesionActiva(correo: string, sesionActiva: string) {
    const sql = 'UPDATE USUARIO SET sesionActiva=? WHERE correo=?';
    await this.db.run(sql, [sesionActiva, correo]);
    await this.leerUsuarios();
  }

  //validar correo
  async validarCorreo(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE correo=?;',
      [correo])).values as Usuario[];
    return usuarios[0];
  }


  //validar respuesta
  async validarRespuesta(respuestaSecreta: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE respuestaSecreta=?;',
      [respuestaSecreta])).values as Usuario[];
    return usuarios[0];
  }


  //Encontrar pregunta usuario
  async validarPregunta(preguntaSecreta: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query('SELECT * FROM USUARIO WHERE preguntaSecreta=?;',
      [preguntaSecreta])).values as Usuario[];
    return usuarios[0];
  }


}




