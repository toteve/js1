// requerimos modulo mongoose
const mongoose = require('mongoose');
// ahora se requiere se inicialice mongoDB a nivel de sistema, ejecutando 
// por consola: mongod , escucha por puerto 27017 sino 4000

// invocamos procesos de environment o sistema operativo, pueden ser por
// defecto o creados por nosotros en archivo .env, como este caso
console.log("Ruta y base de datos: ", process.env.URI);

console.log("En modulo Database.js"," Ok");
// ejemplo invocar directo una bd en Mongodb
// mongoose.connect('mongodb://localhost/javascript',

// ahora usamos metodo connect y promesas pareja .then/.catch, nos conectamos
// a BD definida su ruta en configuracion .env

// mongodb://localhost/javascriptdb
// process.env.URI
mongoose.connect(process.env.URI,
{
    useNewUrlParser: true,  // defecto de biblioteca mongoose
    useUnifiedTopology: true
}) 
    .then(db => console.log(`MongoDB tenemos conexion`))
    .catch(err => console.error(err)); // procesara error de conexion


