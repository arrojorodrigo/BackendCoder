
const fs = require('fs');

class ProductManager {
  products;
  static id = 1;

  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data) || [];
    } catch (err) {
      console.log(`Error al cargar el archivo ${this.path}: ${err}`);
      return [];
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      console.log(`Productos guardados en el archivo ${this.path}`);
    } catch (err) {
      console.log(`Error al guardar los productos en el archivo ${this.path}: ${err}`);
    }
  }

  addProduct(product) {
    const newProduct = {
      id: ProductManager.id++,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    return product || null;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      const updatedProduct = {
        ...this.products[index],
        ...updatedFields,
        id: this.products[index].id
      };
      this.products[index] = updatedProduct;
      this.saveProducts();
      console.log(`Producto con ID ${id} actualizado`);
    } else {
      console.log(`No se encontró un producto con ID ${id}`);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      console.log(`Producto con ID ${id} eliminado`);
    } else {
      console.log(`No se encontró un producto con ID ${id}`);
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager('products.json');

const product1 = {
  title: "BACON",
  description: "Hamburguesa de tocino",
  price: 3000,
  thumbnail: "ABCD",
  code: "120",
  stock: 10,
};

const product2 = {
  title: "SMOG",
  description: "Hamburguesa de barbacoa",
  price: 3200,
  thumbnail: "ABCDE",
  code: "121",
  stock: 8,
};

productManager.addProduct(product1);
productManager.addProduct(product2);

console.log(productManager.getProducts());

const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);

console.log(productManager.getProducts());