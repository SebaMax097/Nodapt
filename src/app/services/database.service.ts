import { Injectable, Query } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DROP_TABLE_QUERIES } from './querys/drop-querys';
import { CREATE_TABLE_QUERIES } from './querys/create-querys';
import { CREATE_TRIGGERS } from './querys/trigger-query';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: any;

  constructor() {}

  // Inicializa la base de datos
  async inicializarBaseDeDatos(): Promise<void> {
    try {
      // Creamos la base de datos si no existe
      this.db = await this.sqlite.createConnection("nodapt", false, "no-encryption", 1, false);
      await this.db.open();
      await this.db.execute('PRAGMA foreign_keys = ON;');
      console.log('Base de datos inicializada');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Creacion de TABLAS
  async creaTablas(): Promise<void> {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }
    try {
      await this.db.run(CREATE_TABLE_QUERIES.creacionTablaClientes)
      await this.db.run(CREATE_TABLE_QUERIES.creacionTablaProductos)
      await this.db.run(CREATE_TABLE_QUERIES.creacionTablaClienteProducto)
      await this.db.run(CREATE_TABLE_QUERIES.creacionTablaPagos)
      await this.db.run(CREATE_TABLE_QUERIES.creacionTablaVenta)
      await this.db.run(CREATE_TABLE_QUERIES.creacionTablaTransacciones)
      console.log('Tablas creadas');

    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
  }

  async crearTriggers(): Promise<void>{
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }try{
    await this.db.run(CREATE_TRIGGERS.triggerCrearClienteProducto)
    await this.db.run(CREATE_TRIGGERS.triggerGenerarPago)
    await this.db.run(CREATE_TRIGGERS.triggerGenerarVenta)
  }catch (error) {
    console.error('Error al crear los triggers:', error);
  }
  }
  // Elimina todas las TABLAS Creadas
  async eliminarTodo(): Promise<void> {
    if (!this.db){
      console.log('Base de datos no inicializada')
    return;    
    }
    try{
      await this.db.execute(DROP_TABLE_QUERIES.dropTransacciones);
      await this.db.execute(DROP_TABLE_QUERIES.dropClienteProducto);
      await this.db.execute(DROP_TABLE_QUERIES.dropPagos);
      await this.db.execute(DROP_TABLE_QUERIES.dropVenta);
      await this.db.execute(DROP_TABLE_QUERIES.dropClientes);
      await this.db.execute(DROP_TABLE_QUERIES.dropProductos);
      console.log('Tablas eliminadas')
      await this.db.execute(DROP_TABLE_QUERIES.eliminarTriggerCrearClienteProducto)
      await this.db.execute(DROP_TABLE_QUERIES.eliminarTriggerGenerarPago)
      await this.db.execute(DROP_TABLE_QUERIES.eliminarTriggerGenerarVenta)
      console.log('Triggers eliminados')

    }catch(error){
      console.log('Error al eliminar las tablas: ', error)
    }

  }

  // Agrega un cliente 
  async agregarCliente(nombre: string): Promise<void> {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }
    console.log(nombre)

    const query = `INSERT INTO CLIENTES (Nombre) VALUES (?)`;
    try {
      await this.db.run(query, [nombre]);
      console.log('Cliente agregado');
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
    }
  }

  // Método para obtener todos los clientes
  async getClientes(): Promise<any> {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }

    const query = `SELECT * FROM CLIENTES`;
    try {
      const result = await this.db.query(query);
      console.log('Clientes:', result.values);
      console.log('result: ',result)
      console.log('result.values: ',result.values)
      console.log('JSON.stringify',JSON.stringify(result))
      return result.values;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }

  async obtenerTablas(): Promise<void> {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }
  
    const queryTablas = `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`;
    const queryTrigger = `SELECT name FROM sqlite_master WHERE type = 'trigger';`;

    try {
      const tablas = await this.db.query(queryTablas);
      console.log('Tablas en la base de datos:', JSON.stringify(tablas));

      const triggers = await this.db.query(queryTrigger)
      console.log('Triggers en la base de datos:', JSON.stringify(triggers))

      return tablas.values;

    } catch (error) {
      console.error('Error al obtener las tablas:', error);
    }
  }

}
