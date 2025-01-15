import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage {

  idProducto: number = 0;
  cantidad: number | undefined;

  constructor(
    private database: DatabaseService
  ) { }

  productoSeleccionado(idProducto: number){
    console.log('Producto: '+idProducto)
    this.idProducto = idProducto
  }

  agregarProducto(){
    if(this.cantidad){
      if(this.idProducto!=0 || this.cantidad>0){
        this.database.agregarProducto(this.idProducto,this.cantidad)
        alert("Producto agregado")
      }
    }
  }  

}
