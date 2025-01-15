import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage {

  transacciones: any[] = [];

  constructor(private database: DatabaseService) { }

  ionViewWillEnter(){
    this.getHistorial();
  }

  async getHistorial(): Promise<any>{
    this.transacciones = await this.database.ultimasTransacciones();
  } 

}
