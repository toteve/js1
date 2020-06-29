// se instancia express no para crear servidor, sino para crear
// un enrutador para las api Rest , tal como /api/books
const { Router } = require('express');
// se crea instancia Router 
const router = Router();

// se requiere path para construir rutas de acceso
const path = require('path');

// se requiere fs-extra para manejo de file system con promesas
// SU metodo unlink del modulo fs-extra nos ayudara a borrar de
// forma fisica de la carpeta donde esta la imagen asociada a la BD 
const { unlink } = require('fs-extra');

// se requiere del directorio /models/book.js que maneja modelo de datos
// EL .. nos permite salir de /routes e ir a /models
const Book = require('../models/Book');


// recordar que index.js llama a este modulo para crear las API REST, ya envia
// la ruta raiz /api/books 
// procesamos peticion GET al servidor con proceso async/await para mostrar libro
router.get('/', async (req, res) => {
    // find comando de mongoDB para listar todos los libros y sort ordenarlos
    // por Id de mongoDB
    const books = await Book.find().sort('-_id');
    // Responder con JSON
    res.json(books);
});

// procesamos peticion POST para grabar datos de un libro con proceso 
// async/await  
router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    // la imagen debe tomarse de otro metodo de req.file ya que no viene
    // con req.body, concatena carpeta uploads/99999.jpg
    const imagePath = '/uploads/' + req.file.filename;
    // nuevo libro recibido completo
    const newBook = new Book({title, author, isbn, imagePath});
    console.log(newBook);
    await newBook.save();
    res.json({'message': 'Book Saved'});
});

// procesamos peticion DELETE para BORRAR datos de un libro con proceso 
// async/await  
router.delete('/:id', async (req, res) => {
    // BORRA DATOS DE BD
    const book = await Book.findByIdAndDelete(req.params.id);

    // BORRAR IMAGENES DE LA CARPETA UPLOADS DENTRO DE PUBLIC, YA QUE SE
    // BORRAN DE MONGODB PERO NO DE LA CARPETA DE LAS IMAGENES
    // SU metodo unlink del modulo fs-extra nos ayudara a borrar de
    // forma fisica de la carpeta donde esta la imagen asociada a la BD
    await unlink(path.resolve('./backend/public/' + book.imagePath));
    
    res.json({message: 'Book Deleted'});
});

// EXPORTAMOS router que es requerida desde /BACKEND/index.js
// para procesar peticion get/post/delete  
module.exports = router;