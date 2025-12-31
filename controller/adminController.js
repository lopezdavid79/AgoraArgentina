const db = require('../config/firebase');

const adminController = {
    // Muestra todas las noticias en una tabla para el admin
    index: async (req, res) => {
        try {
            const snapshot = await db.collection('noticias').orderBy('fecha', 'desc').get();
            const noticias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    // 2. Obtener cursos 
        const snapshotCursos = await db.collection('cursos').get();
        const cursos = snapshotCursos.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            res.render('admin/dashboard', { title: "Panel de Control",
                 noticias ,cursos});
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
            const { titulo, copete, contenido, imagenUrl, alt,slug } = req.body;
            await db.collection('noticias').add({
                titulo,
                copete,
                contenido,
                imagenUrl,
                alt,
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
        const { titulo, copete, contenido, imagenUrl, alt,slug } = req.body;
        await db.collection('noticias').doc(req.params.id).update({
            titulo,
            copete,
            contenido,
            imagenUrl,
            alt,
            slug,
            fechaActualizacion: new Date() // Opcional: para saber cuándo se editó
        });
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send("Error al actualizar la noticia");
    }
},    
// SECCIÓN CURSOS 
    // ==========================================

    // Listar cursos
    indexCursos: async (req, res) => {
        try {
            const snapshot = await db.collection('cursos').get();
            const cursos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.render('admin/cursos/index', { title: "Gestión de Cursos", cursos });
        } catch (error) {
            res.status(500).send("Error al cargar cursos");
        }
    },

    // Formulario de nuevo curso
    createCurso: (req, res) => {
        res.render('admin/cursos/create', { title: "Nuevo Curso" });
    },

    // Guardar curso en Firebase
    storeCurso: async (req, res) => {
        try {
            const { titulo, descripcion, modalidad, duracion, slug, objetivoGeneral, objetivos, temario, imagen ,alt} = req.body;
            
            // Convertimos el texto del textarea en un Array (separado por saltos de línea)
            const objetivosArray = objetivos ? objetivos.split('\n').map(i => i.trim()).filter(i => i !== "") : [];
            const temarioArray = temario ? temario.split('\n').map(i => i.trim()).filter(i => i !== "") : [];

            // Usamos el slug como ID del documento para rutas limpias
            await db.collection('cursos').doc(slug).set({
                titulo,
                descripcion,
                modalidad,
                duracion,
                slug,
                objetivoGeneral,
                objetivos: objetivosArray, // Se guarda como array en Firestore
                temario: temarioArray,     // Se guarda como array en Firestore
                imagen: imagen || "/images/default-curso.png",
                alt: alt,
                fechaCreacion: new Date()
            });
            
            res.redirect('/admin/cursos');
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al guardar el curso");
        }
    },

    // Formulario de edición de curso
    editCurso: async (req, res) => {
        try {
            const doc = await db.collection('cursos').doc(req.params.id).get();
            if (!doc.exists) return res.status(404).send("Curso no encontrado");
            
            const curso = doc.data();
            // Convertimos los arrays a texto para que el admin pueda editarlos fácilmente en un textarea
            const datosParaForm = {
                ...curso,
                id: doc.id,
                objetivosText: curso.objetivos ? curso.objetivos.join('\n') : "",
                temarioText: curso.temario ? curso.temario.join('\n') : ""
            };

            res.render('admin/cursos/edit', { title: "Editar Curso", curso: datosParaForm });
        } catch (error) {
            res.status(500).send("Error al cargar el curso");
        }
    },
    // 2. Procesar la actualización (PUT/POST)
    // ==========================================
    updateCurso: async (req, res) => {
        try {
            const { titulo, descripcion, modalidad, duracion, objetivoGeneral, objetivos, temario, imagen ,alt} = req.body;
            
            // Procesamos los textareas para volver a convertirlos en Arrays de Firebase
            const objetivosArray = objetivos ? objetivos.split('\n').map(i => i.trim()).filter(i => i !== "") : [];
            const temarioArray = temario ? temario.split('\n').map(i => i.trim()).filter(i => i !== "") : [];

            await db.collection('cursos').doc(req.params.id).update({
                titulo,
                descripcion,
                modalidad,
                duracion,
                objetivoGeneral,
                objetivos: objetivosArray,
                temario: temarioArray,
                imagen,
                alt,
                fechaActualizacion: new Date()
            });

            res.redirect('/admin/cursos');
        } catch (error) {
            console.error("Error al actualizar curso:", error);
            res.status(500).send("Error al actualizar el curso");
        }
    },

    // Eliminar curso
    deleteCurso: async (req, res) => {
        try {
            await db.collection('cursos').doc(req.params.id).delete();
            res.redirect('/admin/cursos');
        } catch (error) {
            res.status(500).send("Error al eliminar");
        }
    }



};

module.exports = adminController;