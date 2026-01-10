require('dotenv').config();
// CAMBIO 1: Usar la sintaxis de v2 para evitar errores de puerto
const { onRequest } = require("firebase-functions/v2/https"); 
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

// 1. IMPORTAR LOS ROUTERS
const mainRouter = require('./router/mainRouter');
const authRouter = require('./router/authRouter');
const adminRouter = require('./router/adminRouter');

const app = express();

// --- CONFIGURACIÓN DEL MOTOR DE VISTAS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- MIDDLEWARES GLOBALES ---
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({ extended: false }));       
app.use(express.json());                                
app.use(methodOverride('_method'));                     

// 2. CONFIGURACIÓN DE SESIONES
app.use(session({
    secret: "Adm@gora$", 
    resave: false,                      
    saveUninitialized: false,           
    cookie: { 
        secure: true, // Firebase usa HTTPS obligatoriamente
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// 3. MIDDLEWARE PARA PASAR DATOS DE SESIÓN A LAS VISTAS
app.use((req, res, next) => {
    res.locals.isLogged = false;
    res.locals.user = null;
    if (req.session && req.session.user) { 
        res.locals.isLogged = true;
        res.locals.user = req.session.user;
    }
    next();
});

// 4. USO DE LAS RUTAS
app.use('/', authRouter);
app.use('/', mainRouter);
app.use('/', adminRouter);

// --- GESTIÓN DE ERROR 404 ---
app.use((req, res, next) => {
    res.status(404).redirect('/'); 
});

// --- CAMBIO 2: EXPORTACIÓN PARA FIREBASE V2 ---
// Esto configura la función para que use los recursos correctos en us-central1
exports.app = onRequest({
    region: "us-central1",
    memory: "256Mi"
}, app);