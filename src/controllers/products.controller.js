const { Pool } = require('pg');


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'solidstore',
    port: '5432'
});

const getProducts = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM products');
        res.status(200).json(response.rows);
    } catch (e) {
        console.log(error);
        res.send(error);
    };
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(response.rows);
}

const createProduct = async (req, res) => {
    const { name, description, img_url } = req.body;
    if (!name || !description || !img_url) {
        res.status(400).json({
            message: 'Hay campos sin llenar',
            code: false
        });
    } else {
        await pool.query('INSERT INTO products (name, description, img_url) VALUES ($1, $2, $3)', [name, description, img_url]);
        res.json({
            message: 'Producto creado correctamente',
            body: {
                product: { name, description }
            },
            code: true
        });
    };
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, description, img_url } = req.body;
    if (!name || !description || !img_url) {
        res.status(400).json({
            message: 'Hay campos sin llenar',
            code: false
        })
    } else {
        const response = await pool.query('UPDATE products SET name = $1, description = $2, img_url = $3 WHERE id = $4', [
            name,
            description,
            img_url,
            id
        ]);
        console.log(response)
        res.json({
            message: 'Producto actualizado correctamente',
            code: true
        })
    }

}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if (id) {
        await pool.query('DELETE FROM Products WHERE id = $1', [id])
        res.json({
            message: `Producto #${id} eliminado correctamente`,
            code: true
        })
    } else {
        res.status(400).json({
            message: `No se encuentra el id del producto en la base de datos`,
            code: false
        })
    }

}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct

}