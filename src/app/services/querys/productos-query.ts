export const PRODUCTOS_QUERY = {

    getProductos: `SELECT * FROM PRODUCTOS;`, 
    insertMonster: `INSERT INTO PRODUCTOS (NOMBRE) VALUES ('Monster');`,
    insertGatorade: `INSERT INTO PRODUCTOS (NOMBRE) VALUES ('Gatorade');`,

    getStockProducto: `SELECT * FROM PRODUCTOS WHERE ID=(?);`,

    insertStock: `
        UPDATE PRODUCTOS
        SET Stock = (?)
        WHERE ID=(?);`
    
    
}