const express = require("express");
const productManager = require("./class/productManager2");
const ProductManager = new productManager();
const app = express();
const port = 3000;

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await ProductManager.loadItems();
        const limitedProducts = limit
        ? products.slice(0, parseInt(limit))
        : products;
        res.json(limitedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.get("/products/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await ProductManager.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
