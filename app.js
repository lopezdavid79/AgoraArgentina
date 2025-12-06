const express = require('express');
const app = express();
const path = require("path");
// const bodyParser = require('body-parser'); // ELIMINADO
const methodOverride =  require('method-override');

// 1. Cargar el enrutador principal
const routerMain = require("./router/mainRouter"); 

// 2. Configuración de middlewares y motor de vistas
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); // CORREGIDO: Uso de middleware nativo de Express
app.use(express.urlencoded({ extended: true })); // CORREGIDO: Uso de middleware nativo de Express
app.use(methodOverride('_method'))

// 3. Montar el router para la ruta base (/)
app.use("/", routerMain); 

// 4. Iniciar servidor
app.listen(3000,() => console.log("Server Ágora corriendo en http://localhost:3000"))