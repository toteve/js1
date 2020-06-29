// UN SERVICIO ES UNA CLASE REUTILIZABLE CONFORMADA POR  METODOS

// import por UI.js
// Services para lanzar peticiones al Server, crea la clase BookService 
class BookService {

    constructor() {
        this.URI = `/api/books`; // ruta Api rest en URI 
    }

// PROGRAMACION ASINCRONA DE LOS METODOS ENVIADOS COMO SOLICITUDES AL SERVER
// EN EL BACKEND

    // metodo GET consultar libros al Backend
    async getBooks() 
    {
        const response = await fetch(this.URI); // ACCESO a Api rest   
        const books = await response.json(); // guarda books como json
        return books; // RETORNA BOOKS PARA QUE METODO SEA REUTILIZABLE 
    }

    // metodo POST grabar datos de libros en el Backend 
    async postBook(book) 
    {
        // EN la api rest /api/books enviar book y metodo
        const res = await fetch(this.URI, 
        {
            method: 'POST',
            body: book
        });
        const data = await res.json(); //  salida en Json
    }

    // metodo DELETE para boorar libro, y el ID del libro a borrar
    // se consulta y se procede a eliminar el ID indicado
    async deleteBook(bookId) 
    {
        // ENVIA api + bookid, tipo dato y metodo
        // se construye la api rest con el id del book a borrar
        const res = await fetch(`${this.URI}/${bookId}`, 
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'Delete'
        });
        const data = await res.json();
        console.log(data);
    }

}

// exporta fuera BookService INSTANCIADO DESDE UI.JS
export default BookService;