// modulo que interactua con el DOM, EQUIVALE A JQUERY

// importa o requiere desde /services, a BookService.js  
import BookService from './services/BookService';
const bookService = new BookService();

// entre llaves es cuando no se quiere importar completo una biblioteca
// sino un metodo en especifico de ella en este caso "format" de timeago.js
import { format } from 'timeago.js';


// creacion de clase UI de front end para manejo del DOM, TODO DISEÑO 
// FRONT END
class UI {

  // METODOS DE CLASS UI

  // ESTE RENDERBOOKS PINTA LOS LIBROS EN PANTALLA AL AÑADIR, O CUANDO SE 
  // ELIMINAN
  async renderBooks() {
    // HACEMOS USO DEL BOOKSERVICE PARA CONSULTAR LOS LIBROS
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById('books-cards');
    booksCardContainer.innerHTML = '';
    // CICLO PARA MOSTRAR CADA LIBRO
    books.forEach((book) => {
      const div = document.createElement('div');
      div.className = 'animated fadeInRight';
      div.innerHTML = `
      <div class="card m-2">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${book.imagePath}" class="img-fluid" alt="">
            </div>
            <div class="col-md-8">
                <div class="card-block px-2">
                    <h4 class="card-title">${book.title}</h4>
                    <p class="card-text">${book.author}</p>
                    <a href="#" class="btn btn-danger delete" _id="${book._id}">Borrar</a>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
             ${format(book.created_at)} 
        </div>
      </div>
      `;
      booksCardContainer.appendChild(div);
    });
  }

  // AÑADIR UN NUEVO LIBRO
  async addANewBook(book) {
    await bookService.postBook(book);
    this.renderBooks(); // RENDERIZA PANTALLA AL AÑADIR 
    this.clearBookForm(); // LIMPIA FORMULARIO AL AÑADIR
  }

  // LIMPIAR FORMULARIO Y FIJAR  FOCO
  clearBookForm() {
    document.getElementById('book-form').reset();
    document.getElementById('title').focus();
  }

  // EMITIR MENSAJES POR PANTALLA INVOCADO DESDE APP.JS
  renderMessage(message, colorMessage, secondsToRemove) {
    // Creating a div O marco para mensajes 
    const div = document.createElement('div');
    // Styling the div o estilo color del mensaje
    div.className = `message ${colorMessage}`;
    // Adding Text to the div texto al mensaje
    div.appendChild(document.createTextNode(message));
    // En que zonas colocar el mensaje entre col-md4 y book-form
    const container = document.querySelector('.col-md-4');
    const bookForm = document.querySelector('#book-form');

    // inserta antes del book-form, el div que se ha creado
    container.insertBefore(div, bookForm);


    // FUNCION Removing the div after some secconds, quitar  mensaje despues de 
    // tiempo transcurrido
    setTimeout(() => {
      // borra a la clase message o al mensaje mostrado
      document.querySelector('.message').remove();
    }, secondsToRemove);
  }

  // METODO PARA BORRAR LIBROS
  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks(); // RENDERIZA AL BORRAR LIBRO
  }

}

// EXPORTAR UI QUE FUE INSTANCIADO DESDE APP.JS
export default UI;
