import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-clientes-deuda',
  templateUrl: './clientes-deuda.page.html',
  styleUrls: ['./clientes-deuda.page.scss'],
})
export class ClientesDeudaPage {

  clientes: any[] = []

  constructor(private database: DatabaseService) { }

  ionViewWillEnter() {
    this.getClientesDeuda();
  }

  async getClientesDeuda(){
    console.log('Funcion Page')
    this.clientes = await this.database.getClientesDeuda();
  }

}
