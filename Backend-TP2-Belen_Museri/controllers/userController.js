import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const salt= 10;
const secreyKey = 'appProducts';

async function createUser( req, res  ){
    try {
        const { name, email, password } = req.body;
        // Encripto la contraseña
        const passwordHast =  await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: passwordHast
        });
        await newUser.save();
        res.status(200).json({ newUser});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: []});
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Verifico que el user exista
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe', data: [] });
        }

        // Comparamos el password
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            return res.status(401).json({ message: 'La contraseña es invalida', data: [] });
        }
        
        const token = jwt.sign({ id: user._id, email: user.email }, secreyKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'ok', data: { token, user } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: [] });
    }
}


async function getUsers( req, res ){
    try {
        const users = await User.find()
        res.status(200).json({ message: 'Ok', data: users});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error, data: []});
    }
}

// Editar User
async function updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      const updateData = { name, email, password };
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
  
      res.status(200).json({ message: 'ok', data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar usuario', data: [] });
    }
}

  
export { createUser, getUsers, login, updateUser };

