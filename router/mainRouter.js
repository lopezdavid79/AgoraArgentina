const router = require("express").Router();
const mainController = require("../controller/mainController");

// Ruta para la página de inicio (informativa)
router.get('/',mainController.home);
router.get('/quienes-somos',mainController.quienesSomos);
router.get('/servicios',mainController.servicios);
router.get('/contacto',mainController.contacto); // Descomentada

module.exports = router;