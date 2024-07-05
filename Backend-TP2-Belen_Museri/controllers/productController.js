import Product from "../models/productModel.js";
import User from "../models/userModel.js";

// Obtener todos los productos
async function getProducts( req, res){
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Productos cargados correctamente', data: products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtener un producto por ID
async function getProductById( req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto encontrado', data: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear un nuevo producto
async function createProduct(req, res) {
    try {
        const { name, price, stock, img, description } = req.body;
        const userId = req.user.id; // Use req.user.id

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado', data: [] });
        }

        const newProduct = new Product({
            name,
            price,
            stock,
            img,
            description,
            user: user._id
        });

        await newProduct.save();
        res.status(201).json({ message: 'ok', data: newProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: [] });
    }
}

// Actualizar un producto
async function updateProduct( req, res) {
    const id = req.params.id;
    const productOld = req.body;
    const product = await Product.findByIdAndUpdate( id, productOld  );
    if( product) {
        res.status(200).json({ message: 'Producto actualizado correctamente', data: product});
    } else {
        res.status(404).json({ message: 'El Producto no pudo ser actualizado', data: {} });
    }
}

// Eliminar un producto
const deleteProductById = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Verify that the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado", data: [] });
      }
  
      // Verify that the user is the author of the product
      if (!req.user || !req.user.id) {
        return res.status(403).json({ message: "No tienes permisos para eliminar este producto", data: [] });
      }
  
      if (product.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "No tienes permisos para eliminar este producto", data: [] });
      }
  
      await Product.findByIdAndDelete(productId);
  
      res.status(200).json({ message: "Producto eliminado", data: productId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, data: [] });
    }
  };
  
  


  
// Oobtiene los productos por el usuario ID
const getPproductForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if( !user ){
            res.status(404).json({message:'Usuario no encontrado', data: []});
        }
        
        const products = await Product.find({ user: user._id})

        res.status(200).json({ message: 'Ok', data: products });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: []});
    }
}

// Exporto las funciones
 export { createProduct, getProducts, updateProduct, deleteProductById, getProductById, getPproductForUser}