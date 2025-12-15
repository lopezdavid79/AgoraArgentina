const express = require('express');
const app = express();
const path = require("path");

const methodOverride =  require('method-override');

// 1. Cargar el enrutador principal
const routerMain = require("./router/mainRouter"); 

// 2. Configuración de middlewares y motor de vistas
app.use(express.static(path.join(__dirname, 'public')));
//Configuran EJS como motor de vistas.
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'))

//Montar el router para la ruta base (/)
app.use("/", routerMain); 

// 4. Iniciar servidor



// Usa la variable de entorno PORT, o 3000 como respaldo local.
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Server Ágora corriendo en el puerto ${PORT}`))
