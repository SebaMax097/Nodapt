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

  insertarDatosFalsos(){
    this.database.agregarCliente('Sebastian Ramirez')
    this.database.agregarCliente('Dylan Rada')

    this.database.insertarVenta(1,1,1700,1);
    this.database.insertarVenta(1,1,3400,2);
  
    this.database.insertarPago(1,1,1700,1)

  }

  consultaTablas(){
    console.log('Obtener Tablas y datos')
    this.database.obtenerTablas();
  }
  
  eliminarTablas(){
    this.database.eliminarTodo();
  }

  consultarVentas(){
    this.database.ultimasVentas();
  }

  consultarTransaccion(){
    this.database.ultimasVentasCliente(1);
  }


}
