export const CLIENTES_QUERYS = {

    listaClientes: `SELECT * FROM CLIENTES;`,
    insertCliente: `INSERT INTO CLIENTES (Nombre) VALUES (?)`,
    getCliente: `SELECT * FROM CLIENTES WHERE ID=(?);`,
    getClientesDeuda: `SELECT * FROM CLIENTES WHERE Deuda>0 ORDER BY Deuda DESC;`
}