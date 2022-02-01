const express = require('express');
const CryptoJS = require("crypto-js");
let app = express();

let Usuario = require(__dirname + '/../models/usuario.js');
let usersUtils = require(__dirname + '/../utils/generar_usuarios.js');
let router = express.Router();

// Vista de login
router.get('/login', (req, res) => {
    res.render('login');
});


// Proceso de login (obtener credenciales y cotejar)
router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    Usuario.find().then(resultado => {
        let existeUsuario = resultado.filter(usuario => usuario.usuario == login && usersUtils.decryptData(usuario.password, usersUtils.iv, usersUtils.key) == password);
        if (existeUsuario.length > 0) {
            //req.session.usuario = existeUsuario[0].usuario;
            res.render('public_index');
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
    res.render('/');
});

module.exports = router;