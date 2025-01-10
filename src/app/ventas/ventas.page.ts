import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage {

  clientes: any[] = [];

  constructor(
    private database: DatabaseService,
    private navController: NavController) { }

  ionViewWillEnter(){
    this.obtenerListaClientes();
  }

  async obtenerListaClientes(): Promise<any>{
    this.clientes = await this.database.getListaClientes();
  }

  public seleccionarCliente(idCliente: number){
    this.navController.navigateForward(['/add-venta', idCliente])

  }
}
