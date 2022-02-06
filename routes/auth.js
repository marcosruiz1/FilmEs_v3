const express = require('express');
const CryptoJS = require("crypto-js");

let Usuario = require(__dirname + '/../models/usuario.js');
let router = express.Router();

// Vista de login
router.get('/login', (req, res) => {
    res.render('login');
});


// Proceso de login (obtener credenciales y cotejar)
router.post('/login', (req, res) => {
    Usuario.find({
        usuario: req.body.login,
        password: CryptoJS.SHA256(req.body.password).toString()
    }).then(resultado => {
        if (resultado.length > 0) {
            req.session.login = resultado;
            res.redirect('/');
        } else {
            res.render('login', { error: "Usuario o contraseña incorrectos" });
        }
    }).catch(error => {
        console.log(error);
        res.render('public_error');
    });
});

// Ruta para logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;