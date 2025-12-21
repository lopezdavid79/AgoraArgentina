const db = require('../config/firebase'); // Importa la conexión a Firestore

const mainController = {
    // RUTAS ESTÁTICAS Y HOME
    home: async (req, res) => {
        try {
            // Obtenemos solo las 3 noticias más recientes de Firestore
            const snapshot = await db.collection('noticias')
                .orderBy('fecha', 'desc')
                .limit(3)
                .get();

            const homeNoticias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            res.render('home', {
                title: "Programa Ágora | Inicio",
                noticias: homeNoticias
            });
        } catch (error) {
            console.error("Error en Home:", error);
            res.status(500).send("Error al cargar el inicio");
        }
    },

    quienesSomos: (req, res) => {
        res.render('quienes-somos', { title: "Programa Ágora | Quiénes Somos" });
    },

    servicios: (req, res) => {
        res.render('servicios', { title: "Programa Ágora | Servicios" });
    },

    contacto: (req, res) => {
        res.render('contacto', { title: "Programa Ágora | Contacto" });
    },

    // RUTAS DE CAPACITACIONES (Si también pasas cursos a Firebase, sigue el mismo patrón)
    capacitaciones: (req, res) => {
        // Por ahora mantengo allCursos si sigue siendo local, 
        // pero lo ideal sería pasarlo a Firestore también.
        res.render('capacitaciones', {
            title: "Programa Ágora | Capacitaciones",
            cursos: [] // Aquí iría tu lógica de cursos
        });
    },

    // RUTAS DE NOTICIAS (MODIFICADAS PARA FIREBASE)
    
    // Lista de Noticias completa
    noticias: async (req, res) => {
        try {
            const snapshot = await db.collection('noticias').orderBy('fecha', 'desc').get();
            const noticiasFirebase = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            res.render('noticias', {
                title: "Archivo de Noticias",
                noticias: noticiasFirebase
            });
        } catch (error) {
            res.status(500).send("Error al cargar las noticias");
        }
    },

    // Detalle de Noticia por slug
    noticiaDetail: async (req, res) => {
        try {
            const slug = req.params.slug;
            // Buscamos en la colección el documento que coincida con el slug
            const snapshot = await db.collection('noticias').where('slug', '==', slug).limit(1).get();

            if (snapshot.empty) {
                return res.status(404).send('Error 404: Noticia no encontrada.');
            }

            const noticiaEncontrada = snapshot.docs[0].data();

            res.render('noticias/detail', {
                title: noticiaEncontrada.titulo,
                noticia: noticiaEncontrada
            });
        } catch (error) {
            res.status(500).send("Error al cargar el detalle");
        }
    }
}

module.exports = mainController;