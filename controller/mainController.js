const path = require('path');
const fs = require('fs');

// =============================================================
// BLOQUE DE CARGA DE DATOS (Asegúrate de que la ruta sea correcta)
// =============================================================
const cursosFilePath = path.join(__dirname, '../data/cursos.json');

// Manejo de errores de lectura de archivo para mayor robustez
let cursos = [];
try {
    const data = fs.readFileSync(cursosFilePath, 'utf-8');
    cursos = JSON.parse(data);
} catch (error) {
    console.error('Error al cargar cursos.json:', error.message);
    // En producción, es mejor lanzar un error fatal o manejar un array vacío.
}

// Función auxiliar para buscar un curso por slug (necesaria para el detalle)
const getCursoBySlug = (slug) => {
    return cursos.find(curso => curso.slug === slug);
};


const mainController = {
    home: (req,res) => {
        res.render('home',{title:"Programa Ágora | Inicio"})
    },    
    quienesSomos: (req,res) => {
        res.render('quienes-somos',{title:"Programa Ágora | Quiénes Somos"})
    },    
    servicios: (req,res) => {
        res.render('servicios',{title:"Programa Ágora | Servicios"})
    },
    
    // Función de lista de capacitaciones: Pasa el array cargado
    capacitaciones: (req,res) => {
        res.render('capacitaciones',{
            title:"Programa Ágora | Capacitaciones",
            cursos: cursos
        })
    },

    // Función de detalle de curso (Usa el slug de la URL)
    cursoDetail: (req, res) => {
        const cursoSlug = req.params.slug;
        const cursoEncontrado = getCursoBySlug(cursoSlug);
        
        if (!cursoEncontrado) {
            // Manejo de error 404 (Accesibilidad: siempre notificar al usuario)
            return res.status(404).send('Error 404: El curso solicitado no fue encontrado.');
        }

        res.render('cursos/detail', { 
            title: `Capacitación: ${cursoEncontrado.titulo}`,
            curso: cursoEncontrado
        });
    },

    contacto: (req,res) => {
        res.render('contacto',{title:"Programa Ágora | Contacto"})
    }    
}

module.exports = mainController;