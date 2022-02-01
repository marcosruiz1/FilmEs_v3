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

let peliculaSchema = new moongose.Schema({

    titulo: {
        type: String,
        required: true,
        minlength: 2
    },
    sinopsi: {
        type: String,
        required: true,
        minlength: 10
    },
    duracion: {
        type: Number,
        required: true,
        min: 0
    },
    genero: {
        type: String,
        enum: ["comedia", "terror", "drama", "aventuras", "otras"]
    },
    imagen: {
        type: String,
        required: false
    },
    valoracion: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    plataforma: plataformaSchema,
    director: {
        type: moongose.Schema.Types.ObjectId,
        ref: "directores"
    }
});

let Pelicula = moongose.model("peliculas", peliculaSchema);

module.exports = Pelicula;