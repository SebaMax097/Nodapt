import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {

  public clientes: any[] = []

  constructor(
    private database: DatabaseService,
    private navController: NavController)  { }

  ionViewWillEnter(){
    this.obtenerClientes();
  }

  verDetalleCliente(idCliente: number){
    this.navController.navigateForward(['/details-cliente', idCliente])
  }

  async obtenerClientes(): Promise<void>{
    this.clientes = await this.database.getListaClientes()
  }

}
