// require('dotenv').config();

// si proceso Node no es produccion
var proceso = process.env.NODE_ENV;
console.log("Ambiente de ejecucion: ",proceso);
console.log("Ambiente de ejecucion: ",process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
    // requerir npm i dotenv, que apoya con variables de entorno
    // como token, password y no ponerlas en el codigo
    require('dotenv').config();
    //console.log("Proceso DESPUES que envia: ",proceso);
}
 

// modulos a instalar con npm i n1,n2........
// framework express, morgan para ver respuestas server por consola, cors para
// intercambio FE/BE, multer apoyo para recibir imagenes desde FE, y para rutas
// estaticas requerimos path 
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
// modulo de Nodejs
const path = require('path');

// Creacion instancia de Servidor
const app = express();
// se requiere el archivo database.js q esta en directorio BACKEND
require('./database');

// settings DEFINIR si puerto definido por Mongodb en este caso o sino 4000
app.set('port', process.env.PORT || 4000);
console.log("puerto de conexion: => ",app.get('port'));
//app.set('port',4000);
app.set('json spaces',2);
// middlewares o preservidores 
// ver respuestas basicas en consola con Morgan y Cors para intercambiar FE/BE
app.use(morgan('dev'));
app.use(cors());


// GUARDAR imagenes enviadas desde FE
const storage = multer.diskStorage(
{
    // RUTA de las imagenes /backend/public/uploads, sino existe crea la ruta
    // uso del modulo requerido Path, _dirname es directorio actual ../backend
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) 
    { // indica archivo a grabar req y archivo
        cb(null, new Date().getTime() + path.extname(file.originalname));
        // getTime obtiene un aleatorio en base hora de Date() como nombre
        // y le agregamos la extension original con path.extname 
    }
})


// el nombre conque se va almacenar la imagen se le pasa a multer y metodo
// single indica se sube de una a una y parametro image es lo que viene de FE
app.use(multer({storage}).single('image'));
// LEER datos de formulario enviado por FE en formato json, ajax
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes ruta basica del servidor como api Rest, se pasa como parametros la
// ruta api/books y se requiere el modulo que esta en routes/books.js, el cual
// crea enrutador y procesa peticiones  
app.use('/api/books', require('./routes/books'));

// static files combinacion URL con path fijo, para definir carpeta /public
// recibira objetos estaticos imagenes, html, css, jscript y otros, todo lo 
// q venga del frontend estaticos accedera a backend/public
app.use(express.static(path.join(__dirname, 'public')));

// start the server escuchando servidor
app.listen(app.get('port'), () => {
    console.log("Directorio actual: ",__dirname.toString());
    console.log("Archivo actual: ",__filename.toString());
    console.log("Ambiente que envia: ",proceso);
    console.log("Archivo Storage imagen: ", storage.diskStorage);
    console.log(`Server on port ${app.get('port')}`);
});