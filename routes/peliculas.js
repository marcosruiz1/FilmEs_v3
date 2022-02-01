const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let auth = require(__dirname + '/../utils/auth.js');
let router = express.Router();


// /peliculas
router.get('/', auth.autenticacion, (req, res) => {
    Pelicula.find().then(resultado => {
        res.render('admin_peliculas', { peliculas: resultado });
    }).catch(error => {});
});

// /peliculas/nueva
router.get('/nueva', auth.autenticacion, (req, res) => {
    res.render('admin_peliculas_form');
});

// /peliculas/editar/:id
router.get('/editar/:id', auth.autenticacion, (req, res) => {
    res.render('admin_peliculas_form', { pelicula: resultado });
});

// /peliculas
router.post('/', auth.autenticacion, (req, res) => {
    let nuevaPelicula = new Pelicula({
        titulo: req.body.titulo,
        sinopsi: req.body.sinopsi,
        duracion: req.body.duracion,
        genero: req.body.genero,
        imagen: req.body.imagen,
        sinopsi: req.body.sinopsi,
        valoracion: req.body.valoracion,
        plataforma: req.body.plataforma,
        director: req.body.director
    });
    nuevaPelicula.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', { error: "Error añadiendo película" });
    });
});


// /peliculas/:id
router.put('/:id', auth.autenticacion, (req, res) => {
    Pelicula.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            sinopsi: req.body.sinopsi,
            duracion: req.body.duracion,
            genero: req.body.genero,
            imagen: req.body.imagen,
            sinopsi: req.body.sinopsi,
            valoracion: req.body.valoracion,
            plataforma: req.body.plataforma,
            director: req.body.director
        }
    }, { new: true }).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', { error: "Error actualizando pelicula" });
    });
});


// /peliculas/:id
router.delete('/:id', auth.autenticacion, (req, res) => {
    Pelicula.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', { error: "Error borrando pelicula" });
    });
});


module.exports = router;