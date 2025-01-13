import { Component, OnInit } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage   {
  productos: any[] = []

  constructor(
    private database: DatabaseService
  ) { }

  ionViewWillEnter(){
    this.getProducto();
  }

  async getProducto(){
    this.productos = await this.database.getProductos();
  }

}
