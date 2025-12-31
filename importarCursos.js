// importarCursos.js
require('dotenv').config(); // Esto permite que las variables se carguen localmente y en la nube
const db = require('./config/firebase'); // Importa tu conexión segura
const cursosData = require('./cursos.json'); // Importa el archivo con los datos

async function importar() {
    console.log("Iniciando carga masiva de cursos...");
    
    try {
        const coleccion = db.collection('cursos');

        for (const curso of cursosData) {
            // Eliminamos el campo 'id' numérico del JSON si prefieres usar el ID automático de Firestore
            const { id, ...datosCurso } = curso; 
            
            // Agregamos la fecha de creación automáticamente
            await coleccion.add({
                ...datosCurso,
                fechaCreacion: new Date()
            });
            console.log(`✅ Cargado exitosamente: ${curso.titulo}`);
        }
        
        console.log("-----------------------------------------");
        console.log("🚀 Proceso finalizado con éxito.");
        process.exit(0); // Cierra el proceso de Node al terminar
    } catch (error) {
        console.error("❌ Error durante la carga:", error);
        process.exit(1);
    }
}

importar();