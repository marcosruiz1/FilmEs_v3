const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const iv = CryptoJS.enc.Base64.parse("");
const key = CryptoJS.SHA256("HidePass");
const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://localhost:27017/FilmEsV3');

Usuario.collection.drop();


let usu1 = new Usuario({
    usuario: 'marcos',
    password: encryptData('12345678', iv, key)
});
usu1.save();

let usu2 = new Usuario({
    usuario: 'admin',
    password: encryptData('123456789', iv, key)
});
usu2.save();

function encryptData(data, iv, key) {
    if (typeof data == "string") {
        data = data.slice();
        encryptedString = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    } else {
        encryptedString = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    }
    return encryptedString.toString();
}

function decryptData(encrypted, iv, key) {
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}

module.exports = {
    key,
    iv,
    encryptData,
    decryptData
};