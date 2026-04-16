class Book {
  #title;
  #author;
  #year;

  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get year() {
    return this.#year;
  }

  set title(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('title must be a non-empty string');
    }
    this.#title = value.trim();
  }

  set author(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error('author must be a non-empty string');
    }
    this.#author = value.trim();
  }

  set year(value) {
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(value) || value < 1 || value > currentYear) {
      throw new Error(`year must be an integer between 1 and ${currentYear}`);
    }
    this.#year = value;
  }
  printInfo() {
    console.log(`Book`);
    console.log(`   Title  : ${this.#title}`);
    console.log(`   Author : ${this.#author}`);
    console.log(`   Year   : ${this.#year}`);
  }

  static getOldest(books) {
    if (!Array.isArray(books) || books.length === 0) {
      throw new Error('books must be a non-empty array');
    }
    return books.reduce((oldest, current) => (current.year < oldest.year ? current : oldest));
  }
}

module.exports = Book;
