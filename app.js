const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session'); // Requerir express-session

// 1. IMPORTAR LOS ROUTERS
const mainRouter = require('./router/mainRouter');
const authRouter = require('./router/authRouter'); // Importar el router de autenticación

const app = express();

// --- CONFIGURACIÓN DEL MOTOR DE VISTAS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- MIDDLEWARES GLOBALES ---
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta pública
app.use(express.urlencoded({ extended: false }));       // Capturar datos de formularios
app.use(express.json());                                // Capturar datos JSON
app.use(methodOverride('_method'));                     // Soporte para PUT y DELETE

// 2. CONFIGURACIÓN DE SESIONES (¡Debe ir antes de las rutas!)
app.use(session({
    secret: "AgoraArgentinaSecret2025", // Clave para firmar la cookie
    resave: false,                      // No guarda la sesión si no hay cambios
    saveUninitialized: false,           // No crea sesiones para usuarios no logueados
    cookie: { 
        secure: false,                  // Cambiar a true solo si usas HTTPS
        maxAge: 1000 * 60 * 60 * 24     // La sesión dura 24 horas
    }
}));

// --- MIDDLEWARE PARA PASAR DATOS DE SESIÓN A LAS VISTAS (Opcional pero útil) ---
// Esto permite saber si el usuario está logueado en cualquier archivo .ejs (ej: para mostrar el botón Logout)
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    res.locals.user = req.session.user || null;
    next();
});

// 3. USO DE LAS RUTAS
app.use('/', authRouter); // Rutas de /login y /logout
app.use('/', mainRouter); // Resto de las rutas (home, noticias, servicios, etc.)

// --- GESTIÓN DE ERROR 404 (Siempre al final) ---
app.use((req, res, next) => {
    res.status(404).render('home'); // Redirige al home o una página 404 si la ruta no existe
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});