// llamado por Books.js, requerimos el modulo mongoose para mongoDB 
// pero solo requerimos sus metodos Schema y model
const { Schema, model } = require('mongoose');

// CONSTRUIMOS ESQUEMA BD O SEA SUS CAMPOS DE COLLECTION
const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    imagePath: { type: String }, // ruta y nombre en string
    created_at: { type: Date, default: Date.now }
});

//EXPORTAMOS EL MODELO EN VARIABLE BOOK que puede ser usada por otros modulos
module.exports = model('Book', BookSchema);