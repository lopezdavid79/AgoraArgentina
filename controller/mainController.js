const db = require('../config/firebase');

const mainController = {
    // HOME: Muestra las últimas 3 noticias
    home: async (req, res) => {
        try {
            const snapshot = await db.collection('noticias')
                .orderBy('fecha', 'desc')
                .limit(3)
                .get();

            const homeNoticias = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Formateo de fecha bonita: "22 de diciembre de 2024"
                    fecha: data.fecha ? data.fecha.toDate().toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }) : 'Fecha no disponible'
                };
            });

            res.render('home', {
                title: "Programa Ágora | Inicio",
                noticias: homeNoticias
            });
        } catch (error) {
            console.error("Error en Home:", error);
            res.render('home', { title: "Inicio", noticias: [] });
        }
    },

    // LISTADO DE TODAS LAS NOTICIAS
    noticias: async (req, res) => {
        try {
            const snapshot = await db.collection('noticias')
                .orderBy('fecha', 'desc')
                .get();

            const noticiasFirebase = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    fecha: data.fecha ? data.fecha.toDate().toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }) : 'Fecha no disponible'
                };
            });

            res.render('noticias', {
                title: "Archivo de Noticias",
                noticias: noticiasFirebase
            });
        } catch (error) {
            console.error("Error en página noticias:", error);
            res.status(500).send("Error al cargar las noticias");
        }
    },

    // DETALLE DE UNA NOTICIA
    noticiaDetail: async (req, res) => {
        try {
            const slug = req.params.slug;
            const snapshot = await db.collection('noticias')
                .where('slug', '==', slug)
                .limit(1)
                .get();

            if (snapshot.empty) {
                return res.status(404).send('Noticia no encontrada');
            }

            const doc = snapshot.docs[0];
            const data = doc.data();
            const noticia = {
                id: doc.id,
                ...data,
                fecha: data.fecha ? data.fecha.toDate().toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }) : 'Fecha no disponible'
            };

            res.render('noticias/detail', {
                title: noticia.titulo,
                noticia: noticia
            });
        } catch (error) {
            console.error("Error en detalle:", error);
            res.status(500).send("Error al cargar el detalle");
        }
    },

    // RUTAS ESTÁTICAS (Asegúrate de que estos nombres coincidan con tu Router)
    quienesSomos: (req, res) => {
        res.render('quienes-somos', { title: "Programa Ágora | Quiénes Somos" });
    },

    servicios: (req, res) => {
        res.render('servicios', { title: "Programa Ágora | Servicios" });
    },

    contacto: (req, res) => {
        res.render('contacto', { title: "Programa Ágora | Contacto" });
    },

    capacitaciones: (req, res) => {
        res.render('capacitaciones', {
            title: "Programa Ágora | Capacitaciones",
            cursos: [] // Aquí puedes luego agregar lógica de cursos en Firebase
        });
    },

    cursoDetail: (req, res) => {
        res.render('cursos/detail', { 
            title: "Detalle de Capacitación",
            curso: {} 
        });
    }
};

module.exports = mainController;