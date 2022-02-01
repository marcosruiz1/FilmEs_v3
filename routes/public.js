const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();

// /
router.get('/', (req, res) => {
    Pelicula.find().then(resultado => {
        res.render('public_index', { peliculas: resultado });
    }).catch(error => {
        res.render('error');
    });
});

// /buscar


// /pelicula/:id
router.get('/:id', (req, res) => {
    Pelicula.findById(req.params.id).then(resultado => {
        res.render('public_pelicula', { pelicula: resultado });
    }).catch(error => {
        res.render('error');
    });
});


module.exports = router;