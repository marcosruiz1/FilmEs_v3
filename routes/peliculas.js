const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let Director = require(__dirname + '/../models/director.js');

let auth = require(__dirname + '/../utils/auth.js');
let subida = require(__dirname + '/../utils/subida_imagenes.js');
let router = express.Router();

function obtenerGeneros() {
    let generos = Pelicula.schema.path('genero').enumValues;
    return generos;
}

function formatDate(resultado) {
    let d = new Date(resultado.plataforma.fecha),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


// /peliculas
router.get('/', auth.autenticacion, (req, res) => {
    Pelicula.find().then(resultado => {
        if (resultado.length > 0) {
            res.render('admin_peliculas', { peliculas: resultado });
        } else {
            res.render('admin_error', { error: "No existen películas" });
        }

    }).catch(error => {
        res.render('admin_error');
    });
});

// /peliculas/nueva
router.get('/peliculas/nueva', auth.autenticacion, (req, res) => {
    let generos = obtenerGeneros();
    Director.find().then(resultado => {
        if (resultado.length > 0) {
            res.render('admin_peliculas_form', { directores: resultado, generos: generos });
        } else {
            res.render('admin_error', { error: "No existen directores" });
        }
    }).catch(error => {
        res.render('admin_error');
    });
});

// /peliculas/editar/:id
router.get('/peliculas/editar/:id', auth.autenticacion, (req, res) => {
    let generos = obtenerGeneros();
    let fechaFormateada;
    let directores;
    Director.find().then(resultado => {
        if (resultado.length > 0) {
            directores = resultado;
        } else {
            res.render('admin_error', { error: "No existen directores" });
        }
    }).catch(error => {
        res.render('admin_error');
    });
    Pelicula.findById(req.params.id)
        .populate('plataforma')
        .populate('director')
        .then(resultado => {
            if (resultado) {
                fechaFormateada = formatDate(resultado);
                res.render('admin_peliculas_form', { pelicula: resultado, generos: generos, fechaFormateada: fechaFormateada, directores: directores });
            } else {
                res.render('admin_error', { error: "Película no encontrada" });
            }
        }).catch(error => {
            console.log(error);
            res.render('admin_error');
        });
});

// /peliculas/
router.post('/peliculas', subida.upload.single('imagen'), auth.autenticacion, (req, res) => {

    if (typeof req.file == 'undefined') {
        res.render('admin_error', { error: "No se ha seleccionado ninguna imagen" });
    }

    let nuevaPelicula = new Pelicula({
        titulo: req.body.titulo,
        sinopsi: req.body.sinopsi,
        duracion: req.body.duracion,
        genero: req.body.genero,
        imagen: req.file.filename,
        valoracion: req.body.valoracion,
        plataforma: {
            nombre: req.body.plataformaN,
            fecha: req.body.plataformaD,
            premium: req.body.premium
        },
        director: req.body.director
    });
    nuevaPelicula.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        console.log(error);
        res.render('admin_error', { error: "Error insertando película" });
    });

});


// /peliculas/:id
router.put('/peliculas/:id', subida.upload.single('imagen'), auth.autenticacion, (req, res) => {
    let imagen;
    if (typeof req.file == 'undefined') {
        imagen = req.body.imagen;
    } else {
        imagen = req.file.filename;
    }

    Pelicula.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            sinopsi: req.body.sinopsi,
            duracion: req.body.duracion,
            genero: req.body.genero,
            imagen: imagen,
            sinopsi: req.body.sinopsi,
            valoracion: req.body.valoracion,
            plataforma: {
                nombre: req.body.plataformaN,
                fecha: req.body.plataformaD,
                premium: req.body.premium
            },
            director: req.body.director
        }
    }, { new: true }).then(resultado => {
        if (resultado) {
            res.redirect(req.baseUrl);
        } else {
            res.render('admin_error', { error: "Película no encontrada" });
        }
    }).catch(error => {
        res.render('admin_error');
    });
});


// //:id
router.delete('/peliculas/:id', auth.autenticacion, (req, res) => {
    Pelicula.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado) {
            res.redirect(req.baseUrl);
        } else {
            res.render('admin_error', { error: "Película no encontrada" });
        }
    }).catch(error => {
        res.render('admin_error');
    });
});


module.exports = router;