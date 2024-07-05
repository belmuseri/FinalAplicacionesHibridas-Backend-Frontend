// Modelo de Producto
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [5, 'El nombre de contener 5 caracteres como minimo'],
        maxlength: 200
    },
    price: Number,
    stock: Number,
    img: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
})


const Product = mongoose.model('Product', productSchema);
// Exporto el Objeto Product

export default Product