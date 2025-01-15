import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage  {

  datos: any = [];
  
  constructor(private database: DatabaseService) { }

  ionViewWillEnter() {
    this.getResumen();
  }

  async getResumen(){
    this.datos = await this.database.getResumen();
  }
}
