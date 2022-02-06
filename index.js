// Librerías externas
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require("nunjucks");
const session = require('express-session');
const methodOverride = require('method-override');

// Enrutadores
const peliculas = require(__dirname + '/routes/peliculas');
const usuarios = require(__dirname + '/routes/auth');
const public = require(__dirname + '/routes/public');


// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/FilmEsV3', { useNewUrlParser: true });
let app = express();

// Asignación del motor de plantillas
app.set('view engine', 'njk');
// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});


// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(express.json());
app.use(express.urlencoded());
// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(methodOverride('_method'));

// Configuración de la sesión en la aplicación
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

// Este middleware se emplea para poder acceder a la sesión desde las vistas
// como una variable "session". Es útil para poder mostrar unos contenidos u
// otros en función de los atributos guardados en la sesión. La utilizaremos
// para mostrar el botón de Login o el de Logout en la vista "base.njk"
// según si el usuario está validado o no.
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});



// Carga de middleware y enrutadores
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/admin', peliculas);
app.use('', public);
app.use('/usuarios', usuarios);
app.use('', usuarios);




// Puesta en marcha del servidor
app.listen(8080);