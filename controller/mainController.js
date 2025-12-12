

const mainController = {
    home: (req,res) => {
        // Renderiza la plantilla 'home.ejs' y pasa el título
        res.render('home',{title:"Programa Ágora | Inicio"})
    },    
    quienesSomos: (req,res) => {
        // Nueva función para Quiénes Somos
        res.render('quienes-somos',{title:"Programa Ágora | Quiénes Somos"})
    },    
    servicios: (req,res) => {
        // Nueva función para Servicios
        res.render('servicios',{title:"Programa Ágora | Servicios"})
    },
    capacitaciones: (req,res) => {
        // Nueva función para Ccapacitaciones
        res.render('capacitaciones',{title:"Programa Ágora | Capacitaciones"})
    },

    contacto: (req,res) => {
        // Descomentado y adaptado para la nueva estructura
        res.render('contacto',{title:"Programa Ágora | Contacto"})
    }    
}

module.exports = mainController; 