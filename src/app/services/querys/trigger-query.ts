export const TRIGGER_QUERYS = {
  triggerCrearClienteProducto: `
    CREATE TRIGGER CREAR_CLIENTE_PRODUCTO
    AFTER INSERT ON CLIENTES
    FOR EACH ROW
    BEGIN
        INSERT INTO CLIENTE_PRODUCTO (ID_Cliente, ID_Producto) VALUES (NEW.ID, 1);
        INSERT INTO CLIENTE_PRODUCTO (ID_Cliente, ID_Producto) VALUES (NEW.ID, 2);
    END;
  `,

  triggerGenerarVenta: `
    CREATE TRIGGER GENERAR_VENTA
    AFTER INSERT ON VENTA
    FOR EACH ROW
    BEGIN
        -- SE ACTUALIZA EL INVENTARIO --
        UPDATE PRODUCTOS
        SET Stock = STOCK - NEW.cantidad
        WHERE ID = NEW.ID_Producto;

        -- SE AGREGA DEUDA A USUARIO --
        UPDATE CLIENTES
        SET Deuda = Deuda + NEW.Precio
        WHERE ID = NEW.ID_Cliente;

        UPDATE CLIENTE_PRODUCTO
        SET PRESTAMO_PENDIENTE = PRESTAMO_PENDIENTE + NEW.cantidad
        WHERE ID_Cliente = NEW.ID_Cliente AND ID_Producto = NEW.ID_Producto;

        INSERT INTO TRANSACCIONES (ID_Cliente, ID_Producto, Tipo, Valor, cantidad, Fecha)
        VALUES (NEW.ID_Cliente, NEW.ID_Producto, 1, NEW.Precio, NEW.cantidad, NEW.fecha);
    END;
  `,

  triggerGenerarPago: `
    CREATE TRIGGER GENERAR_PAGO
    AFTER INSERT ON PAGOS
    FOR EACH ROW
    BEGIN
        -- SE ACTUALIZA CLIENTE --
        UPDATE CLIENTES
        SET Deuda = DEUDA - NEW.Monto
        WHERE ID = NEW.ID_Cliente;

        UPDATE CLIENTE_PRODUCTO
        SET PRESTAMO_PENDIENTE = PRESTAMO_PENDIENTE - NEW.cantidad
        WHERE ID_Cliente = NEW.ID_Cliente AND ID_Producto = NEW.ID_Producto;

        INSERT INTO TRANSACCIONES (ID_Cliente, ID_Producto, Tipo, Valor, cantidad, Fecha)
        VALUES (NEW.ID_Cliente, NEW.ID_Producto, 2, NEW.Monto, NEW.cantidad, NEW.fecha);
    END;
  `,
  getTriggers:`SELECT name FROM sqlite_master WHERE type = 'trigger';`
};
