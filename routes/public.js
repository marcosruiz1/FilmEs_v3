const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();

// /
router.get('/', (req, res) => {
    Pelicula.find().then(resultado => {
        if (resultado.length > 0) {
            res.render('public_index', { peliculas: resultado });
        } else {
            res.render('public_error', { error: "No se encontraron películas" });
        }

    }).catch(error => {
        res.render('public_error');
    });
});

// /buscar
router.post('/buscar', (req, res) => {
    Pelicula.find({ titulo: req.body.busqueda }).then(resultado => {
        if (resultado.length > 0) {
            res.render('public_index', { peliculas: resultado });
        } else {
            res.render('public_error', { error: "No se encontraron películas" });
        }

    }).catch(error => {
        console.log(error);
        res.render('public_error');
    });
});



// /pelicula/:id
router.get('/pelicula/:id', (req, res) => {

    Pelicula.findById(req.params.id)
        .populate('plataforma')
        .populate('director')
        .then(resultado => {
            if (resultado) {
                res.render('public_pelicula', { pelicula: resultado });
            } else {

                res.render('public_error', { error: "Película no encontrada" });
            }

        }).catch(error => {
            console.log(error);
            res.render('public_error');
        });
});


module.exports = router;