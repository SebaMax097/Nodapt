import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-details-cliente',
  templateUrl: './details-cliente.page.html',
  styleUrls: ['./details-cliente.page.scss'],
})

export class DetailsClientePage{
  idCliente: number = 0;
  public clientes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private database: DatabaseService
  ) {
    // Recuperar el parámetro 'IdCliente' de la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('idCliente');

      if (id) {
        this.idCliente = parseInt(id, 10);
        if (isNaN(this.idCliente)) {
          console.error('El IdCliente no es un número válido');
        } else {
          console.log('Constructor ID Cliente: '+this.idCliente)
        }
      } else {
        console.error('El parámetro IdCliente no está presente en la URL');
      }
    });
  }

  ionViewWillEnter(){
    this.getDetalleCliente();
    console.log('Page iniciada')
  }

  async getDetalleCliente(): Promise<any>{
    this.clientes = await this.database.getCliente(this.idCliente)
    console.log('ID Cliente: '+this.idCliente)
    console.log('this.clientes: '+JSON.stringify(this.clientes))
  }

}

