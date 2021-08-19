"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuracion de rutas globales
app.use("/api", require("./routes/index"));

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;

// Usamos el método connect para conectarnos a nuestra base de datos
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(
      "La conexión a la base de datos test se ha realizado correctamente"
    );

    app.listen(3001, () => {
      console.log(`Runing in 3001`);
    });
  })
  .catch((err) => console.log(err));
