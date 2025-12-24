const db = require('../config/firebase');

const adminController = {
    // Muestra todas las noticias en una tabla para el admin
    index: async (req, res) => {
        try {
            const snapshot = await db.collection('noticias').orderBy('fecha', 'desc').get();
            const noticias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.render('admin/dashboard', { title: "Panel de Control", noticias });
        } catch (error) {
            res.status(500).send("Error al cargar el panel");
        }
    },

    // Muestra el formulario de creación
    create: (req, res) => {
        res.render('admin/noticias/create', { title: "Nueva Noticia" });
    },

    // Procesa el guardado en Firestore
    store: async (req, res) => {
        try {
            const { titulo, copete, contenido, imagenUrl, slug } = req.body;
            await db.collection('noticias').add({
                titulo,
                copete,
                contenido,
                imagenUrl,
                slug,
                fecha: new Date() // Guarda el timestamp actual
            });
            res.redirect('/admin/dashboard');
        } catch (error) {
            res.send("Error al guardar la noticia");
        }
    },
// controller/adminController.js

// 1. Mostrar el formulario con los datos cargados
edit: async (req, res) => {
    try {
        const doc = await db.collection('noticias').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send("Noticia no encontrada");
        }
        res.render('admin/noticias/edit', { 
            title: "Editar Noticia", 
            noticia: { id: doc.id, ...doc.data() } 
        });
    } catch (error) {
        res.status(500).send("Error al cargar la noticia");
    }
},

// 2. Procesar la actualización (PUT)
update: async (req, res) => {
    try {
        const { titulo, copete, contenido, imagenUrl, slug } = req.body;
        await db.collection('noticias').doc(req.params.id).update({
            titulo,
            copete,
            contenido,
            imagenUrl,
            slug,
            fechaActualizacion: new Date() // Opcional: para saber cuándo se editó
        });
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send("Error al actualizar la noticia");
    }
}    
};

module.exports = adminController;