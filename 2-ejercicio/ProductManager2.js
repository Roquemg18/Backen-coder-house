class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error('Todos los campos del producto son obligatorios');
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error(`El producto con código ${product.code} ya existe`);
            return;
        }

        product.id = this.nextId;
        this.nextId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error('Producto no encontrado');
        }
        return product;
    }

    updateProduct(id, product) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error('Producto no encontrado');
            return;
        }

        if (product.id !== id) {
            console.error('No se puede cambiar el id del producto');
            return;
        }

        this.products[index] = product;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            console.error('Producto no encontrado');
            return;
        }

        this.products.splice(index, 1);
    }
}