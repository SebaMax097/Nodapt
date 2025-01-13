export const CREATE_TABLE_QUERIES = {
    habilitarClavesForaneas: `PRAGMA foreign_keys = ON;`,
  
    creacionTablaClientes: `
      CREATE TABLE IF NOT EXISTS "CLIENTES" (
        "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
        "Nombre" TEXT NOT NULL,
        "Deuda" INTEGER DEFAULT 0
      );
    `,
  
    creacionTablaProductos: `
      CREATE TABLE IF NOT EXISTS "PRODUCTOS" (
        "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
        "Nombre" TEXT NOT NULL,
        "Stock" INTEGER NOT NULL DEFAULT 0
      );
    `,
  
    creacionTablaClienteProducto: `
      CREATE TABLE IF NOT EXISTS "CLIENTE_PRODUCTO" (
        "ID_CLIENTE" INTEGER NOT NULL,
        "ID_PRODUCTO" INTEGER NOT NULL,
        "PRESTAMO_PENDIENTE" INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY("ID_CLIENTE") REFERENCES "CLIENTES"("ID"),
        FOREIGN KEY("ID_PRODUCTO") REFERENCES "PRODUCTOS"("ID")
      );
    `,
  
    creacionTablaVenta: `
      CREATE TABLE IF NOT EXISTS "VENTA" (
        "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
        "ID_Producto" INTEGER NOT NULL,
        "ID_Cliente" INTEGER NOT NULL,
        "Precio" INTEGER NOT NULL,
        "Cantidad" INTEGER NOT NULL,
        "Fecha" TEXT NOT NULL DEFAULT (datetime('now','localtime')),
        FOREIGN KEY("ID_Cliente") REFERENCES "CLIENTES"("ID"),
        FOREIGN KEY("ID_Producto") REFERENCES "PRODUCTOS"("ID")
      );
    `,
  
    creacionTablaPagos: `
      CREATE TABLE IF NOT EXISTS "PAGOS" (
        "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
        "ID_Cliente" INTEGER NOT NULL,
        "ID_Producto" INTEGER NOT NULL,
        "Monto" INTEGER NOT NULL,
        "Cantidad" INTEGER NOT NULL,
        "Fecha" TEXT NOT NULL DEFAULT (datetime('now','localtime')),
        FOREIGN KEY("ID_Cliente") REFERENCES "CLIENTES"("ID"),
        FOREIGN KEY("ID_Producto") REFERENCES "PRODUCTOS"("ID")
      );
    `,
  
    creacionTablaTransacciones: `
      CREATE TABLE IF NOT EXISTS "TRANSACCIONES" (
        "ID_Cliente" INTEGER NOT NULL,
        "ID_Producto" INTEGER NOT NULL,
        "Tipo" INTEGER NOT NULL,
        "Valor" INTEGER NOT NULL,
        "Cantidad" INTEGER NOT NULL,
        "Fecha" TEXT NOT NULL,
        FOREIGN KEY("ID_Cliente") REFERENCES "CLIENTES"("ID"),
        FOREIGN KEY("ID_Producto") REFERENCES "PRODUCTOS"("ID")
      );
    `,
  };
  