import { Component, OnInit } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async ngOnInit() {
    // await this.setupDatabase();
  }

  // async setupDatabase() {
  //   try {
  //     // Crear y abrir la base de datos
  //     const db = await this.sqlite.createConnection('miBaseDeDatos', false, 'no-encryption', 1, false);
  //     await db.open();

  //     // Crear tabla si no existe
  //     await db.execute(`
  //       CREATE TABLE IF NOT EXISTS example_table (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         name TEXT NOT NULL
  //       );
  //     `);

  //     // Insertar datos
  //     await db.execute(`
  //       INSERT INTO example_table (name) VALUES ('Primer Dato');
  //     `);

  //     // Consultar datos
  //     const result = await db.query('SELECT * FROM example_table');
  //     console.log('Result: ', result)
  //     console.log('Result.values: ', result.values)

  //     console.log('Result JSON', JSON.stringify(result))
  //     console.log('Result JSON.values', JSON.stringify(result.values))
  //     // Revisar si hay resultados
  //     if (result.values && result.values.length > 0) {
  //       // Iterar sobre los resultados y mostrarlos en consola
  //       result.values.forEach((row) => {
  //         console.log(`ID: ${row.id}, Name: ${row.name}`);
  //       });
  //       console.log('Resultado Console: ', result.values)
  //     } else {
  //       console.log('No se encontraron datos.');
  //     }

  //     // Cerrar la base de datos
  //     await db.close();
  //   } catch (err) {
  //     console.error('Error al configurar la base de datos:', err);
  //   }
  // }
  
}
