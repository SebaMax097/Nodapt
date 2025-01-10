export const CLIENTE_PRODUCTO_QUERYS = {

    getClienteProducto: `SELECT * FROM CLIENTE_PRODUCTO;`,
    getDetalleCliente: `SELECT 
        CLI.ID,
        CLI.Nombre,
        CLI.Deuda,
        PR.Nombre,
        CLP.PRESTAMO_PENDIENTE
        FROM CLIENTES CLI
        JOIN CLIENTE_PRODUCTO CLP ON (CLI.ID = CLP.ID_Cliente)
        JOIN PRODUCTOS PR ON (CLP.ID_Producto = PR.ID)
        WHERE CLI.ID = (?);`
}