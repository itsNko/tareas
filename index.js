const express = require('express');
const app = express();
//file writer:
const fs = require("fs");

//Cargar directorio public:
app.use(express.static("public"));
//Recibir objetos del cliente (extended:true, cualquier objeto)
app.use(express.urlencoded({extended:true}));
app.use(express.json())

//Download from Server:
app.get("/download", (req, res) => {
    fs.readFile("public/data.txt", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data)
        res.json(JSON.parse(data))
    });
})

//Upload to Server:
app.post("/upload", (req, res) => {
    fs.writeFile("public/data.txt", JSON.stringify(req.body), function(err) {
        if(err){
            return console.log(err);
        }
    })
    res.send("Successfully received.")
})

app.listen(3000, function() {console.log("Servidor lanzado en el puerto 3000")});