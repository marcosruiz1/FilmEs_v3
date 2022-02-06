const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");


const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://localhost:27017/FilmEsV3');

Usuario.collection.drop();

let usu1 = new Usuario({
    usuario: 'marcos',
    password: CryptoJS.SHA256('12345678')
});
usu1.save();

let usu2 = new Usuario({
    usuario: 'admin',
    password: CryptoJS.SHA256('12345678')
});
usu2.save();

let usu3 = new Usuario({
    usuario: 'juan',
    password: CryptoJS.SHA256('123456789')
});
usu3.save();