export const TRANSACCIONES_QUERY = {

    getVentas: `SELECT * FROM VENTA;`,
    getUltimasVentas: `SELECT
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

    getTransacciones: `SELECT * FROM TRANSACCIONES;`,

}