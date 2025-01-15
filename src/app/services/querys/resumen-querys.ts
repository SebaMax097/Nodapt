export const RESUMEN_QUERYS = {


    getDeudaTotal:
    `SELECT 
    SUM(Deuda) as 'Suma_Deuda'
    FROM CLIENTES;`,

    getTotalVendido:
    `SELECT
    SUM(Precio) as 'Total_Vendido'
    FROM VENTA;`,

    getTotalPagado:
    `SELECT
    SUM(Monto) as 'Total_Pagado'
    FROM PAGOS;`

    
    
}