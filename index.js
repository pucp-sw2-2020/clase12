'use strict'

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "northwind"
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión exitosa a base de datos");
    }
});


//localhost:3000/listaCategorias
app.get("/listaCategorias", function (request, response) {
    var query = "select * from categories";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

//localhost:3000/listaProductos
app.get("/listaProductos", function (request, response) {
    var query = "select * from products inner join suppliers on (products.supplierid = suppliers.supplierId)";
    conn.query(query, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});

//localhost:3000/obtenerProducto/:id
app.get("/obtenerProductoPorId/:id", function (request, response) {
    var idProducto = request.params.id;
    var query = "select * from products where productid = ?";
    var parametros = [idProducto];
    conn.query(query, parametros, function (err, resultado) {
        if (err) {
            console.log(err);
        } else {
            response.json(resultado);
        }
    });
});


//localhost:3000/porPost
/*
    --> parámetros por post
    - nombre
    - apellido
 */
app.post("/porPost", function (request, response) {
    var nombre = request.body.nombre;
    var apellido = request.body.apellido;
    //response.send(`Nombre: ${nombre} | Apellido: ${apellido}`);
    var jsonRespuesta =
        {
            estado: "ok",
            datos: {
                "nombre": nombre,
                "apellido": apellido
            }
        };
    response.json(jsonRespuesta);
});

//localhost:3000/
app.get("/", function (request, response) {
    console.log("nueva solicitud a /")
    response.send("Hola mundo estimados alumnos");
});

app.get("/samuel", function (request, response) {
    console.log("nueva solicitud a /samuel");
    response.send("Hola samuel");
});

//localhost:3000/pucp/<parámetro>
app.get("/pucp/:nombre", function (request, response) {
    var nombre = request.params.nombre;
    console.log("nueva solicitud a /pucp/" + nombre);
    response.send("Hola " + nombre);
});

//localhost:3000/telecom?apellido=<valor>
app.get("/telecom", function (req, res) {
    var apellido = req.query.apellido;
    console.log("nueva solicitud a /telecom?apellido=" + apellido);
    res.send("Hola apellido = " + apellido);
});

app.listen(3000, function () {
    console.log("servidor levantado exitosamente");
});
