import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        minlength: [3, 'El nombre debe ser de al menos tres caracteres'],
        maxlength: [50, 'El nombre debe ser menor a 50 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: [true, 'La dirección de correo eletrónico ya está en uso'],
        match: [ /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'La dircción de correo electro no es valida'],
        minlength: [10, 'El email debe ser de al menos 10 caracteres'],
        maxlength: [100, 'El email debe ser menor a 100 caracteres']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [8, 'La contraseña debe ser de almenos 8 caracteres'],
        maxlength: [256, 'La contraseña debe ser menor a 256 caracteres']
    },
    image: {
        type: String
    },
    descripcition: { 
        type: String
    }
})

const User = mongoose.model('User', userSchema);

export default User;
