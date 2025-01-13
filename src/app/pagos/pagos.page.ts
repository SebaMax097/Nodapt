import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage {

  constructor(
    private database: DatabaseService,
    private navController: NavController
  ) { }

  clientes: any[] = []

  ionViewWillEnter(){
    this.getClientes();
  }
  
  async getClientes(): Promise<any>{
    this.clientes = await this.database.getListaClientes()
  }

  public seleccionarCliente(idCliente: number){
    this.navController.navigateForward(['/add-pago', idCliente])

  }

}
