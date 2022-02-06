const moongose = require("mongoose");

let plataformaSchema = moongose.Schema({

    nombre: {
        type: String,
        required: true,
        minlength: 2
    },
    fecha: {
        type: Date,
        required: false
    },
    premium: {
        type: Boolean,
        default: false
    }

});


let Plataforma = moongose.model("plataformas", plataformaSchema);

module.exports = Plataforma;