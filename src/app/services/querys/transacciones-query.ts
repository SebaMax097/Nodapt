export const TRANSACCIONES_QUERY = {

    getVentas: `SELECT * FROM VENTA;`,

    getUltimasVentas: `
        SELECT
        VEN.ID AS ID,
        CLI.Nombre AS Cliente,
        PR.Nombre AS Productos,
        VEN.Cantidad AS Cantidad,
        VEN.Precio AS Precio,
        VEN.Fecha AS Fecha
        FROM VENTA VEN
        JOIN CLIENTES CLI ON (CLI.ID = VEN.ID_Cliente)
        JOIN PRODUCTOS PR ON (PR.ID = VEN.ID_Producto)
        ORDER BY VEN.FECHA DESC;`,

        
    insertVenta: `INSERT INTO VENTA (ID_Cliente, ID_Producto, Precio, cantidad) VALUES (?,?,?,?);`,


    getPagos: `SELECT * FROM PAGOS;`,
    insertPago: `INSERT INTO PAGOS (ID_Cliente, ID_Producto, Monto, Cantidad) VALUES (?,?,?,?);`,

    getTransacciones: `SELECT * FROM TRANSACCIONES;`,
    getUltimasTransaccionesCliente: `
        SELECT 
        CLI.Nombre AS 'Cliente',
        PR.Nombre AS 'Producto',
        CASE 
        WHEN (TRA.TIPO = 1) THEN 'VENTA'
        ELSE 'PAGO'
        END AS 'Tipo',
        TRA.Valor,
        TRA.Cantidad,
        TRA.Fecha
        FROM TRANSACCIONES TRA
        JOIN CLIENTES CLI ON (TRA.ID_Cliente = CLI.ID)
        JOIN PRODUCTOS PR ON (TRA.ID_Producto = PR.ID)
        WHERE TRA.ID_Cliente = ?
        ORDER BY TRA.FECHA DESC;`,
}