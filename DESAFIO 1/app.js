class ProductManager {
    products;
    static id = 1
    constructor(title, description, price, thumbnail, code, stock,) {
        this.products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    addProduct(product) {
        let productoAagregar = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,

            id: ProductManager.id
        };
        let existe = this.products.find((p) => p.code === product.code);
        if (existe) {
            return console.log("el codigo  " + product.code + " ya existe");
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.log("falta llenar el campo requerido")
        }

        else {
            this.products.push(productoAagregar);
            ProductManager.id++
        }
    }

    getProducts() {
        return this.products;

    }

    getProductsById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product)
        } else {
            console.log("error")
        }
    }
}

const nuevosProductos = new ProductManager();

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
 // description: "Hamburguesa de barbacoa",   // comentado para que salte en consola
    price: 3200,
    thumbnail: "ABCDE",
    code: "121",
    stock: 8,
};

const product3 = {
    title: "STRONG",
    description: "Hmaburgesa de morrón",
    price: 3000,
    thumbnail: "ABCDEFG",
    code: "120", //codigo repetido para que salte en consola
    stock: 11,
};

const product4 = {
    title: "CORDERO",
    description: "Hamburguesa de cordero",
    price: 3500,
    thumbnail: "ABCDEFGH",
    code: "123",
    stock: 10,
};

const product5 = {
    title: "VEGGIE",
    description: "Hamburguesa de garbanzo",
    price: 2800,
    thumbnail: "ABCDEFGHI",
    code: "124",
    stock: 20,
};

nuevosProductos.addProduct(product1);
nuevosProductos.addProduct(product2);
nuevosProductos.addProduct(product3);
nuevosProductos.addProduct(product4);
nuevosProductos.addProduct(product5);

console.log(nuevosProductos.getProducts())

console.log("Carpe diem ¡!")
console.log(nuevosProductos.getProductsById(2))