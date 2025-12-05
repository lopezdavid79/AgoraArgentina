const mainController = {
    home: (req,res) => {
        // Renderiza la plantilla 'home.ejs' y pasa el título
        res.render('home',{title:"Programa Ágora"})
    },    
    // contacto: (req,res) => {
    //     res.render('contacto',{title:"Programa Ágora contacto"})
    // }    
}

module.exports = mainController;
