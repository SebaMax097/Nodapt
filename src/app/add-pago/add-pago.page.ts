import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-pago',
  templateUrl: './add-pago.page.html',
  styleUrls: ['./add-pago.page.scss'],
})
export class AddPagoPage {

  clientesProductos: any[] = []
  idCliente: number = 0;
  idProducto: number = 0;
  cantidad!: number | undefined;
  precio!: number | undefined;

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
    this.getClienteProducto(this.idCliente);
  }
  
  async getClienteProducto(idCliente: number): Promise<any>{
    this.clientesProductos = await this.database.getDetalleClienteProducto(idCliente)
  }

  productoSeleccionado(idProducto: number){
    console.log('Producto: '+idProducto)
    this.idProducto = idProducto
  }

  public generarPago(){
    console.log('ID Cliente: '+this.clientesProductos[0].ID)

    if(this.idProducto==1){
    console.log('Producto: Monster')
    }else if (this.idProducto==2) {
      console.log('Producto: Gatorade')
    }else{
      console.log('Debe seleccionar un producto')
      alert('Debe seleccionar un producto')
      return;
    }
    
    console.log()
    if(this.precio){
      if(this.cantidad){
        if (!Number.isInteger(this.cantidad)) {
          alert('La cantidad debe ser mayor a 0');
          return;
        }
      
        if (!Number.isInteger(this.precio) || this.cantidad > this.precio) {
          console.error('El precio debe ser un número entero mayor a 0');
          alert('El precio debe ser mayor a 0');
          return;
        } 
        console.log(this.clientesProductos[0].ID, this.idProducto, this.precio, this.cantidad)
        this.database.insertarPago(this.clientesProductos[0].ID, this.idProducto, this.precio, this.cantidad)
        alert('Pago generado')
            
        }
      }
    }
}
