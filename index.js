const Book = require('./Book');
const EBook = require('./EBook');

console.log('='.repeat(45));
console.log(' ЗАВДАННЯ 1 — Book instances');
console.log('='.repeat(45));

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 1937);
const book2 = new Book('1984', 'George Orwell', 1949);
const book3 = new Book('Clean Code', 'Robert C. Martin', 2008);

book1.printInfo();
console.log();
book2.printInfo();
console.log();
book3.printInfo();

console.log('\n' + '='.repeat(45));
console.log(' ЗАВДАННЯ 2 — EBook instance');
console.log('='.repeat(45));

const ebook1 = new EBook('JavaScript: The Good Parts', 'Douglas Crockford', 2008, 'PDF');
ebook1.printInfo();

console.log('\n' + '='.repeat(45));
console.log(' ЗАВДАННЯ 3 — Геттери та сеттери');
console.log('='.repeat(45));

console.log('До зміни title:', book1.title);
book1.title = 'The Hobbit (Updated Edition)';
console.log('Після зміни title:', book1.title);

console.log('\nДо зміни fileFormat:', ebook1.fileFormat);
ebook1.fileFormat = 'epub'; // сеттер приведе до верхнього регістру
console.log('Після зміни fileFormat:', ebook1.fileFormat);

console.log('\nВалідація — спроба встановити некоректний рік:');
try {
  book2.year = 99999;
} catch (e) {
  console.log('  ✗ Помилка:', e.message);
}

console.log('Валідація — спроба встановити невідомий формат:');
try {
  ebook1.fileFormat = 'DOCX';
} catch (e) {
  console.log('  ✗ Помилка:', e.message);
}

console.log('\n' + '='.repeat(45));
console.log(' ЗАВДАННЯ 4 — Book.getOldest()');
console.log('='.repeat(45));

const ebook2 = new EBook(
  'Structure and Interpretation of Computer Programs',
  'Harold Abelson',
  1984,
  'EPUB',
);
const ebook3 = new EBook('The Pragmatic Programmer', 'Andrew Hunt', 1999, 'MOBI');

const allBooks = [book1, book2, book3, ebook1, ebook2, ebook3];

console.log('Список книг (назва / рік):');
allBooks.forEach((b) => console.log(`  - "${b.title}" (${b.year})`));

const oldest = Book.getOldest(allBooks);
console.log('\nНайдавніша книга:');
oldest.printInfo();

console.log('\n' + '='.repeat(45));
console.log(' ЗАВДАННЯ 5 — EBook.fromBook()');
console.log('='.repeat(45));

const sourceBook = new Book('Design Patterns', 'Gang of Four', 1994);
console.log("Вихідний об'єкт Book:");
sourceBook.printInfo();

const convertedEBook = EBook.fromBook(sourceBook, 'FB2');
console.log('\nСтворений EBook через fromBook():');
convertedEBook.printInfo();

console.log('\n' + '='.repeat(45));
