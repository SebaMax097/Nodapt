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
    this.clientes = await this.database.getDetalleClienteProducto(idCliente)
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


    if(this.precio){
      if(this.cantidad){
        
        if (this.precio <= 0 || !Number.isInteger(this.precio)) {
          console.error('El precio debe ser un número entero mayor a 0');
          alert('El precio debe ser mayor a 0');
          return;
        }
        if (this.cantidad <= 0 || !Number.isInteger(this.cantidad) || this.cantidad > this.precio) {
          console.error('La cantidad debe ser un número entero mayor a 0');
          alert('La cantidad debe ser mayor a 0');
          return;
        }
      
        this.database.insertarVenta(this.clientes[0].ID, this.idProducto, this.precio, this.cantidad)
        alert('Venta generada')
            
        }
      }
    }
  
    
  }

