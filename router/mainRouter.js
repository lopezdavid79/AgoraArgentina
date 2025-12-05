const router = require("express").Router();
const mainController = require("../controller/mainController");

// Ruta para la página de inicio (informativa)
router.get('/',mainController.home);
// router.get('/contacto',mainController.contacto); // Puedes añadir más rutas si es necesario

module.exports = router;