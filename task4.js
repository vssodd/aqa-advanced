const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
};

console.log('Before modification:', person);

const Add = (person.firstName = 'Vlad');
const Del = delete person.age;

console.log('After deletion:', person);
