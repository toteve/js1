// APP.JS principal encriptado y no visible en desarrollo en el Front end
// en el index.html

// codigo ecmascript 6 importa el app.css q esta en carpeta /styles
import "./styles/app.css"; // require("./styles/app.css");

// codigo ecmascript 6 importa el book.js q esta en carpeta /models para
// modelo de datos del libro 
import Book from './models/Book.js';

// codigo ecmascript 6 importa el UI.js q esta en la raiz de /Front end, para
// procesar peticiones GET, POST y DELETE a la api REST  
import UI from './UI.js';

// INSTANCIANDO A UI.JS  CON RENDERBOOKS, ESTO  PERMITE AL CARGAR LA PAGINA
// MOSTRAR TODO LOS LIBROS DISPONIBLES 
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  ui.renderBooks();
});

// CAPTURANDO EN CONSTANTES LOS VALORES DEL FORMULARIO DEL LIBRO
// DE BOOK-FORM, DE SU EVENTO SUBMIT
document.getElementById('book-form')
  .addEventListener('submit', function(e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    const image = document.getElementById('image').files;
     
    // formulario virtual creado para tener los datos del libro
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    // for(var pair of formData.entries()) {
    //   console.log(pair[0]+', '+pair[1]);
    // }

    // Instatiating the UI, instanciado el UI CREADO EN UI.JS
    const ui = new UI();

    // New Book Object NUEVO OBJETO DEL LIBRO
    const book = new Book(title, author, isbn);

    // Validating User Input QUE NO ESTEN VACIOS
    if (title === '' || author === '' || isbn === '') {
      ui.renderMessage('Por favor rellenar todos los campos', 'error', 3000);
    } else {
      // Pass the new book to the UI CREACION DEL NUEVO LIBRO
      ui.addANewBook(formData);
      // INVOCA EL RENDERMESSAGE DE UI CON MENSAJE COLOR Y TIEMPO
      ui.renderMessage('Nuevo libro añadido', 'success', 2000);
    }

    e.preventDefault(); 
    // PARA EVITAR SE REINICIE POR DEFECTO EL FORM CON SUBMIT
  });

  // hacer click en boton DELETE de BOOK-CARDS e invocar el metodo deletebook
  // de UI
document.getElementById('books-cards')
  .addEventListener('click', e => {
    const ui = new UI();
    if (e.target.classList.contains('delete')) {
      // INVOCAR EL DELETEBOOK DE UI CON EL ID A BORRAR 
      ui.deleteBook(e.target.getAttribute('_id'));
      // INVOCA EL RENDERMESSAGE DE UI CON MENSAJE COLOR Y TIEMPO
      ui.renderMessage('Libro borrado Ok', 'success', 3000);
    }
    e.preventDefault();
  });
