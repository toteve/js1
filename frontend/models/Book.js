// llamado import por App.js define la clase Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// exporta Book para su uso fuera
export default Book;
