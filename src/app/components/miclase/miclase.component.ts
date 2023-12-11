import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Asistencia } from 'src/app/models/Asistencia';
import { DataBaseService } from 'src/app/services/data-base.service';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MiclaseComponent  implements OnInit {

  asistencia= new Asistencia();

  constructor(private bd: DataBaseService) { }

  ngOnInit() {
    this.bd.datosQR.subscribe((datosQR) => {
      this.asistencia = new Asistencia().obtenerAsistenciaDesdeQR(datosQR);
    });
  }

}
