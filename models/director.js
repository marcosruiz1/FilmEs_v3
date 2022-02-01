const moongose = require("mongoose");

let directorSchema = moongose.Schema({

    nombre: {
        type: String,
        required: true,
        minlength: 5
    },
    nacimiento: {
        type: Date,
        required: false
    }
});

let Director = moongose.model("directores", directorSchema);

module.exports = Director;