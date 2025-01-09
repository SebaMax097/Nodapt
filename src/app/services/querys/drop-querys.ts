export const DROP_TABLE_QUERIES = {
    dropTransacciones: `DROP TABLE IF EXISTS TRANSACCIONES;`,
    dropClienteProducto: `DROP TABLE IF EXISTS CLIENTE_PRODUCTO;`,
    dropPagos: `DROP TABLE IF EXISTS PAGOS;`,
    dropVenta: `DROP TABLE IF EXISTS VENTA;`,
    dropClientes: `DROP TABLE IF EXISTS CLIENTES;`,
    dropProductos: `DROP TABLE IF EXISTS PRODUCTOS;`,
    eliminarTriggerCrearClienteProducto: `DROP TRIGGER IF EXISTS CREAR_CLIENTE_PRODUCTO;`,
    eliminarTriggerGenerarVenta: `DROP TRIGGER IF EXISTS GENERAR_VENTA;`,
    eliminarTriggerGenerarPago: `DROP TRIGGER IF EXISTS GENERAR_PAGO;`,
  };