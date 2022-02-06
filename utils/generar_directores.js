const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');

mongoose.connect('mongodb://localhost:27017/FilmEsV3');

Director.collection.drop();

let director1 = new Director({
    nombre: 'Marcos',
    nacimiento: Date.now()
});
director1.save();

let director2 = new Director({
    nombre: 'Luis Benito',
    nacimiento: Date.now()
});
director2.save();

let director3 = new Director({
    nombre: 'Sebastian',
    nacimiento: Date.now()
});
director3.save();

let director4 = new Director({
    nombre: 'Juan Carlos',
    nacimiento: Date.now()
});
director4.save();