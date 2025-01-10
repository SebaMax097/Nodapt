import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  public clientes: any[] = []

  constructor(private database: DatabaseService) { }


  ngOnInit() {
  }

  crearTablaClientes(){
    console.log('Crear Tablas')
    this.database.creaTablas();
  }
  
  crearTriggers(){
    console.log('agregarTriggers')
    this.database.crearTriggers()
  }

  async obtenerClientes(): Promise<void>{
    console.log('Obtener Clientes')
    this.clientes = await this.database.getListaClientes();
  }

  consultaTablas(){
    console.log('Obtener Tablas')
    this.database.obtenerTablas();
  }
  
  eliminarTablas(){
    this.database.eliminarTodo();
  }
  
  insertarVenta() {
    const idCliente = 1;   // Cliente de prueba
    const idProducto = 1;  // Producto de prueba
    const precio = 1700;   // Precio de prueba
    const cantidad = 1;    // Cantidad de prueba
  
    console.log('Enviando datos:', idCliente, idProducto, precio, cantidad);
    this.database.insertarVenta(idCliente, idProducto, precio, cantidad);
  }
  consultarVentas(){
    this.database.ultimasVentas();
  }


}
