export const CLIENTE_PRODUCTO_QUERYS = {

    getClienteProducto: `SELECT * FROM CLIENTE_PRODUCTO;`,
    getDetalleCliente: `SELECT 
        CLI.ID as 'ID',
        CLI.Nombre AS 'Cliente',
        CLI.Deuda AS 'Deuda',
        PR.Nombre AS 'Producto',
        CLP.PRESTAMO_PENDIENTE AS 'PRESTAMO_PENDIENTE'
        FROM CLIENTES CLI
        JOIN CLIENTE_PRODUCTO CLP ON (CLI.ID = CLP.ID_Cliente)
        JOIN PRODUCTOS PR ON (CLP.ID_Producto = PR.ID)
        WHERE CLI.ID = (?);`
}