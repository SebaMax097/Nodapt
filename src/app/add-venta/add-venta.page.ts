import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.page.html',
  styleUrls: ['./add-venta.page.scss'],
})
export class AddVentaPage {
  clientes: any[] = []
  idCliente: number = 0;
  idProducto: number = 0;
  cantidad: number = 0;
  precio: number = 0;

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
    this.getCliente(this.idCliente);
  }

  async getCliente(idCliente: number): Promise<any>{
    this.clientes = await this.database.getCliente(idCliente)
  }

  productoSeleccionado(idProducto: number){
    console.log('Producto: '+idProducto)
    this.idProducto = idProducto
  }

  generarVenta(){
    console.log('ID Cliente: '+this.clientes[0].ID,'| Nombre: '+this.clientes[0].Nombre)

    if(this.idProducto==1){
    console.log('Producto: Monster')
    }else if (this.idProducto==2) {
      console.log('Producto: Gatorade')
    }else{
      console.log('Debe seleccionar un producto')
      alert('Debe seleccionar un producto')
      return;
    }

  if (this.cantidad <= 0 || !Number.isInteger(this.cantidad)) {
    console.error('La cantidad debe ser un número entero mayor a 0');
    alert('La cantidad debe ser mayor a 0');
    return;
  }

  if (this.precio <= 0 || !Number.isInteger(this.precio)) {
    console.error('El precio debe ser un número entero mayor a 0');
    alert('El precio debe ser mayor a 0');
    return;
  } 

    console.log('Cantidad producto: '+this.cantidad)
    console.log('Precio total: '+this.precio)
    console.log('Query: '+this.clientes[0].ID+','+this.idProducto+','+this.cantidad+','+this.precio )
  }



}
