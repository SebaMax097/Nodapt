import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

  public clientes: any[] = []

  constructor(private database: DatabaseService) { }

  ionViewWillEnter(){
    this.obtenerClientes()
  }

  async obtenerClientes(): Promise<void>{
    this.clientes = await this.database.getClientes()
  }

}
