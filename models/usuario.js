const moongose = require("mongoose");

let usuarioSchema = new moongose.Schema({

    usuario: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

let Usuario = moongose.model("usuarios", usuarioSchema);

module.exports = Usuario;