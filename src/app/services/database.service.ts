import { Injectable, Query } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DROP_TABLE_QUERIES } from './querys/drop-querys';
import { CREATE_TABLE_QUERIES } from './querys/create-querys';
import { TRIGGER_QUERYS } from './querys/trigger-query';
import { CLIENTES_QUERYS } from './querys/clientes-querys';
import { TRANSACCIONES_QUERY } from './querys/transacciones-query'; 
import { PRODUCTOS_QUERY } from './querys/productos-query';
import { CLIENTE_PRODUCTO_QUERYS } from './querys/cliente-producto-query';

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
    await this.db.run(PRODUCTOS_QUERY.insertMonster)
    await this.db.run(PRODUCTOS_QUERY.insertGatorade)
    console.log('Productos agregados')
  }

  async crearTriggers(): Promise<void>{
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }try{
    await this.db.run(TRIGGER_QUERYS.triggerCrearClienteProducto)
    await this.db.run(TRIGGER_QUERYS.triggerGenerarPago)
    await this.db.run(TRIGGER_QUERYS.triggerGenerarVenta)
  }catch (error) {
    console.error('Error al crear los triggers:', error);
  }
  }

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

  async agregarCliente(nombre: string): Promise<void> {
    try {
      await this.db.run(CLIENTES_QUERYS.insertCliente, [nombre]);
      console.log('Cliente ',nombre,' agregado');

    } catch (error) {
      console.error('Error al agregar el cliente:', error);
    }
  }

  async getListaClientes(): Promise<any> {    
    try {
      const result = await this.db.query(CLIENTES_QUERYS.listaClientes);
      console.log('Result: '+JSON.stringify(result))
      return result.values;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }

  async getCliente(idCliente: number): Promise<any>{
    try {
      const query = (`SELECT * FROM CLIENTES WHERE ID=(?);`)
      const result = await this.db.query(query, [idCliente]);
      console.log('getClienteDB: '+JSON.stringify(result))
      return result.values;
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  }

  async getDetalleClienteProducto(idCliente: number): Promise<any[]> {
    interface InterfaceDetalle {
      [idCliente: number]: {
        ID: number;
        Cliente: string;
        Deuda: number;
        prestamoMonster: number;    // Deuda de "Monster"
        prestamoGatorade: number;   // Deuda de "Gatorade"
      };
    }
  
    // Realizar la consulta a la base de datos
    const result = await this.db.query(CLIENTE_PRODUCTO_QUERYS.getDetalleCliente, [idCliente]);
    console.log('detalleCliente: ', JSON.stringify(result));
  
    // Inicializar el objeto consolidado
    const consolidado: InterfaceDetalle = {};
  
    // Iterar sobre los resultados
    result.values.forEach((x: any) => {
      const id = x.ID;
  
      // Si no existe el cliente en el consolidado, inicializarlo
      if (!consolidado[id]) {
        consolidado[id] = {
          ID: x.ID,
          Cliente: x.Cliente,
          Deuda: x.Deuda,  // Usar el valor de deuda desde el resultado
          prestamoMonster: 0,     // Inicializar deuda de Monster
          prestamoGatorade: 0,    // Inicializar deuda de Gatorade
        };
      }
  
      // Actualizar los valores según el tipo de producto
      if (x.Producto === 'Monster') {
        consolidado[id].prestamoMonster = x.PRESTAMO_PENDIENTE; // Actualizar deuda de Monster
      } else if (x.Producto === 'Gatorade') {
        consolidado[id].prestamoGatorade = x.PRESTAMO_PENDIENTE; // Actualizar deuda de Gatorade
      }
    });
  
    // Convertir el objeto consolidado en un arreglo y retornarlo
    const detalleClienteProducto = Object.values(consolidado);
  
    console.log('--Nuevo Arreglo Consolidado--');
    console.log(JSON.stringify(detalleClienteProducto, null, 2));
  
    return detalleClienteProducto;
  }
  
  async obtenerTablas(): Promise<void> {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }
  
    const queryTablas = `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`;

    try {
      const tablas = await this.db.query(queryTablas);
      console.log('TABLAS: ', JSON.stringify(tablas, null, 1));

      const triggers = await this.db.query(TRIGGER_QUERYS.getTriggers)
      console.log('TRIGGERS: ', JSON.stringify(triggers, null, 1))

      const clientes = await this.db.query(CLIENTES_QUERYS.listaClientes)
      console.log('CLIENTES: ', JSON.stringify(clientes, null, 1))

      const productos = await this.db.query(PRODUCTOS_QUERY.getProductos)
      console.log('PRODUCTOS:: '+JSON.stringify(productos, null, 1))

      const cliente_producto = await this.db.query(CLIENTE_PRODUCTO_QUERYS.getClienteProducto)
      console.log('CLIENTE_PRODUCTO: ', JSON.stringify(cliente_producto, null, 1))

      const ventas = await this.db.query(TRANSACCIONES_QUERY.getVentas)
      console.log('VENTAS: ', JSON.stringify(ventas, null, 1))

      const pagos = await this.db.query(TRANSACCIONES_QUERY.getPagos)
      console.log('PAGOS: ', JSON.stringify(pagos, null, 1))

      const transacciones = await this.db.query(TRANSACCIONES_QUERY.getTransacciones)
      console.log('TRANSACCIONES', JSON.stringify(transacciones, null, 1))

    } catch (error) {
      console.error('Error al obtener las tablas:', error);
    }
  }

  async insertarVenta(idCliente: number, idProducto: number, precio: number, cantidad: number){
    
    try {
      await this.db.run(TRANSACCIONES_QUERY.insertVenta, [idCliente, idProducto, precio, cantidad]);
      console.log('Venta agregada');

    } catch (error) {
      console.error('Error al agregar la venta:', error);
    }
  }

  async insertarPago(idCliente: number, idProducto: number, Monto: number, cantidad: number){
    try {
      await this.db.run(TRANSACCIONES_QUERY.insertPago, [idCliente, idProducto, Monto, cantidad]);
      console.log('Pago agregada');

    } catch (error) {
      console.error('Error al agregar el pago:', error);
    }
  }

  async ultimasVentas(): Promise <any>{

    const resultados = await this.db.query(TRANSACCIONES_QUERY.getUltimasVentas)
    console.log(JSON.stringify(resultados))
  }

  async ultimasVentasCliente(idCliente: number): Promise<any>{
    const query = TRANSACCIONES_QUERY.getUltimasTransaccionesCliente;
    const result = await this.db.query(query, [idCliente]);
    console.log('ultimasVentasCliente:')
    console.log(JSON.stringify(result))
    return result.values;

  }
}
