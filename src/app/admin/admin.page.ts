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
    this.clientes = await this.database.getClientes();
  }

  consultaTablas(){
    console.log('Obtener Tablas')
    this.database.obtenerTablas();
  }
  
  eliminarTablas(){
    this.database.eliminarTodo();
  }


}
