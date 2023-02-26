const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;

    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId = this.products[this.products.length - 1].id + 1;
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}: ${error}`);
    }
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

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log(`Producto con id ${product.id} agregado satisfactoriamente`);
    } catch (error) {
      console.log(`Error al escribir en el archivo ${this.path}: ${error}`);
    }
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}: ${error}`);
    }

    return this.products;
  }

  getProductById(id) {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}: ${error}`);
    }

    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error('Producto no encontrado');
    }

    return product;
  }

  updateProduct(id, updatedFields) {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}: ${error}`);
    }

    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error('Producto no encontrado');
      return;
    }

    const product = this.products[index];
    const updatedProduct = { ...product, ...updatedFields };
    this.products[index] = updatedProduct;

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log(`Producto con id ${id} actualizado satisfactoriamente`);
    } catch (error) {
      console.log(`Error al escribir en el archivo ${this.path}: ${error}`);
    }
  }

  deleteProduct(id) {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(`Error al leer el archivo ${this.path}: ${error}`);
    }

    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error('Producto no encontrado');
      return;
    }

    this.products.splice(index, 1);

    try {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
        console.log(`Error al escribir en el archivo ${this.path}: ${error}`);
    }
}
}
