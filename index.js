const express = require('express');
const app = express();
//file writer:
const fs = require("fs");

//Cargar directorio public:
app.use(express.static("public"));
//Recibir objetos del cliente (extended:true, cualquier objeto)
app.use(express.urlencoded({extended:true}));

/*
app.post("/test", (req, res) => {
    res.send("Patatata")
})*/

app.listen(3000, function() {console.log("Servidor lanzado en el puerto 3000")});