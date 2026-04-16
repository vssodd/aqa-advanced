const Book = require('./Book');

const ALLOWED_FORMATS = ['PDF', 'EPUB', 'MOBI', 'FB2', 'TXT', 'AZW'];

class EBook extends Book {
  #fileFormat;

  constructor(title, author, year, fileFormat) {
    super(title, author, year);
    this.fileFormat = fileFormat;
  }

  get fileFormat() {
    return this.#fileFormat;
  }

  set fileFormat(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('fileFormat must be a non-empty string');
    }
    const upper = value.trim().toUpperCase();
    if (!ALLOWED_FORMATS.includes(upper)) {
      throw new Error(`fileFormat must be one of: ${ALLOWED_FORMATS.join(', ')}`);
    }
    this.#fileFormat = upper;
  }

  printInfo() {
    super.printInfo();
    console.log(`   Format : ${this.#fileFormat}`);
    console.log(`   Type   : EBook`);
  }

  static fromBook(book, fileFormat) {
    if (!(book instanceof Book)) {
      throw new Error('First argument must be an instance of Book');
    }
    return new EBook(book.title, book.author, book.year, fileFormat);
  }
}

module.exports = EBook;
