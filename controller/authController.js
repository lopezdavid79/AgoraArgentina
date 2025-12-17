const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

const authController = {
    // 1. Muestra el formulario de login (GET /login)
    showLogin: (req, res) => {
        res.render('admin/login', { errors: null }); 
    },

    // 2. Procesa el formulario de login (POST /login)
    login: (req, res) => {
        const { username, password } = req.body;
        const user = User.findByUsername(username); 

        // 2.1. Verificar si existe el usuario
        if (!user) {
            return res.render('admin/login', { errors: { global: 'Credenciales inválidas.' } });
        }

        // 2.2. Comparar la contraseña (hash)
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (isPasswordValid) {
            // Éxito: Crear la sesión
            req.session.isLoggedIn = true;
            req.session.user = { id: user.id, username: user.username, rol: user.rol };
            
            // Redirigir a la interfaz de administración de noticias
            return res.redirect('/admin/noticias/create'); 
        } else {
            // Fallo de autenticación
            res.render('admin/login', { errors: { global: 'Credenciales inválidas.' } });
        }
    },

    // 3. Cerrar la sesión (GET o POST /logout)
    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) console.error(err);
            res.redirect('/login');
        });
    }
};
    // A. Mostrar el Formulario (GET /noticias/create)
    createNewsForm: (req, res) => {
        res.render('noticias/create'); // Asumiendo que views/noticias/create.ejs existe
    

    // B. Guardar la Noticia (POST /noticias/create)
    storeNews: (req, res) => {
        // req.body contiene los campos de texto
        // req.file contiene los datos de la imagen subida por Multer

        const newNoticia = {
            title: req.body.title,
            content: req.body.content,
            date: new Date().toLocaleDateString('es-AR'),
            // Guarda la RUTA RELATIVA de la imagen para usarla en las vistas
            image: req.file ? '/images/noticias/' + req.file.filename : '/images/default.jpg' 
        };

        News.save(newNoticia);

        // Redirigir al listado de noticias o a la nueva noticia
        res.redirect('/noticias');
    }
};

module.exports = authController;