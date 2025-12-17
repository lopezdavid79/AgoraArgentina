const router = require("express").Router();
const mainController = require("../controller/mainController");

// =========================================================
// RUTAS PRINCIPALES ESTÁTICAS
// =========================================================
// Ruta Raíz (Inicio)
router.get('/', mainController.home);
// Ruta Quienes Somos
router.get('/quienes-somos', mainController.quienesSomos);
// Ruta Servicios
router.get('/servicios', mainController.servicios);
// Ruta Contacto
router.get('/contacto', mainController.contacto);


// =========================================================
// RUTAS DE CONTENIDO DINÁMICO (Capacitaciones y Noticias)
// =========================================================

// 1. Rutas de Capacitaciones
// Lista de cursos completa
router.get('/capacitaciones', mainController.capacitaciones); 
// Detalle de un curso por su SLUG (Ej: /cursos/nvda-basico)
router.get('/cursos/:slug', mainController.cursoDetail); 

// 2. Rutas de Noticias (NUEVAS)
// Lista de todas las noticias (Página completa de archivo)
router.get('/noticias', mainController.noticias); 
// Detalle de una noticia por su SLUG (Ej: /noticias/convenio-asaerca-vacantes)
router.get('/noticias/:slug', mainController.noticiaDetail);


module.exports = router;