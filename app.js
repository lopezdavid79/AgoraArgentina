const express = require('express');
const app = express();
const path = require("path");

const methodOverride =  require('method-override');
const session = require('express-session'); 
// Configuración de Sesiones
app.use(session({
    secret: 'CLAVE_SECRETA_LARGA_PARA_AGORA', // ¡Cambia esto por algo único y largo!
    resave: false, // No forzar que la sesión se guarde en cada request
    saveUninitialized: false, // No crear sesiones para usuarios que no han iniciado sesión
    cookie: { 
        secure: 'auto', // Auto: usa HTTPS si es necesario (mejor para producción)
        maxAge: 1000 * 60 * 60 * 24 // Cookie dura 24 horas
    }
}));

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
