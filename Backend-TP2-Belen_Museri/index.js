import express from "express";
import mongoose from "mongoose";
import { routerAPI }  from "./routes/index.js";
const app = express();
const port = 3000;

import cors from "cors";
// permite acceso desde el exterior
app.use( cors() )


mongoose.connect( 'mongodb://127.0.0.1:27017/basededatos', { useNewUrlParser: true, useUnifiedTopology: true}  )

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.use( express.json() );

app.get('/', (req, res) => {
    res.status(200).send('<h1> CRUD de Alquiler de equipos de Ski y Snowboard </h1>');
})

routerAPI(app);


app.listen( 3000, () =>{
    console.log('Servidor escuchando en el puerto ' + port);
})
