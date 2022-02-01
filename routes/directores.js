const express = require('express');

let Usuario = require(__dirname + '/../models/director.js');
let router = express.Router();

// /directores
router.get('/', (req, res) => {
    Director.find().then(resultado => {
        res.render('admin_peliculas', { directores: resultado });
    }).catch(error => {});
});

module.exports = router;